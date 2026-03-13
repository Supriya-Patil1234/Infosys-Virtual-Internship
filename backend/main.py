from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from pydantic import BaseModel
import shutil
import whisper
import os
import torch

from database import SessionLocal
from models import User, Transcript


# =============================
# APP INIT
# =============================
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =============================
# SECURITY CONFIG
# =============================
SECRET_KEY = "supersecretkey123"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


# =============================
# REQUEST MODELS
# =============================
class AuthRequest(BaseModel):
    username: str
    password: str


# =============================
# HELPER FUNCTIONS
# =============================
def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")

        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")

        user = db.query(User).filter(User.id == int(user_id)).first()

        if not user:
            raise HTTPException(status_code=401, detail="User not found")

        return user

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


# =============================
# LOAD WHISPER MODEL
# =============================
UPLOAD_FOLDER = "uploads"

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

print("Loading Whisper model...")
whisper_model = whisper.load_model("tiny")   # CPU safe
print("Whisper model loaded")


# =============================
# LOAD FLAN-T5 MODEL
# =============================
print("Loading FLAN-T5 summarization model...")
device = "cuda" if torch.cuda.is_available() else "cpu"

tokenizer = AutoTokenizer.from_pretrained("google/flan-t5-base")
summarizer_model = AutoModelForSeq2SeqLM.from_pretrained(
    "google/flan-t5-base"
).to(device)

print("FLAN-T5 model loaded")


# =============================
# CHUNK-BASED SUMMARIZATION
# =============================
def generate_summary(text: str):
    if not text.strip():
        return ""

    max_chunk_tokens = 400

    # Encode full text
    token_ids = tokenizer.encode(text, return_tensors="pt", truncation=False)[0]

    chunks = []
    for i in range(0, len(token_ids), max_chunk_tokens):
        chunks.append(token_ids[i:i + max_chunk_tokens])

    partial_summaries = []

    for chunk in chunks:
        chunk_text = tokenizer.decode(chunk, skip_special_tokens=True)

        prompt = f"""
        Summarize the following transcript clearly and in detail:

        {chunk_text}
        """

        inputs = tokenizer(
            prompt,
            return_tensors="pt",
            truncation=True,
            max_length=512
        ).to(device)

        outputs = summarizer_model.generate(
            **inputs,
            max_length=180,
            min_length=60,
            num_beams=5,
            length_penalty=1.0,
            early_stopping=True
        )

        summary_chunk = tokenizer.decode(
            outputs[0],
            skip_special_tokens=True
        )

        partial_summaries.append(summary_chunk)

    combined_text = " ".join(partial_summaries)

    final_prompt = f"""
    Create a well-structured final summary of the following text:

    {combined_text}
    """

    final_inputs = tokenizer(
        final_prompt,
        return_tensors="pt",
        truncation=True,
        max_length=512
    ).to(device)

    final_outputs = summarizer_model.generate(
        **final_inputs,
        max_length=220,
        min_length=80,
        num_beams=6,
        length_penalty=1.0,
        early_stopping=True
    )

    final_summary = tokenizer.decode(
        final_outputs[0],
        skip_special_tokens=True
    )

    return final_summary


# =============================
# ROUTES
# =============================

@app.get("/")
def home():
    return {"message": "Backend running securely with Whisper + FLAN-T5"}


# -------- REGISTER --------
@app.post("/register")
def register(req: AuthRequest, db: Session = Depends(get_db)):

    existing = db.query(User).filter(User.username == req.username).first()

    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_password = hash_password(req.password)

    user = User(username=req.username, password=hashed_password)
    db.add(user)
    db.commit()

    return {"message": "User created successfully"}


# -------- LOGIN --------
@app.post("/login")
def login(req: AuthRequest, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.username == req.username).first()

    if not user or not verify_password(req.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token({"sub": str(user.id)})

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


# -------- UPLOAD --------
@app.post("/upload")
async def upload(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    file_path = f"{UPLOAD_FOLDER}/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # 1️⃣ Transcription
    result = whisper_model.transcribe(file_path)
    transcript = result["text"]

    # 2️⃣ Summarization
    summary = generate_summary(transcript)

    new_record = Transcript(
        filename=file.filename,
        transcript=transcript,
        summary=summary,
        user_id=current_user.id
    )

    db.add(new_record)
    db.commit()
    db.refresh(new_record)

    return {
        "transcript": transcript,
        "summary": summary,
        "record_id": new_record.id
    }


# -------- HISTORY --------
@app.get("/history")
def get_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    records = db.query(Transcript).filter(
        Transcript.user_id == current_user.id
    ).all()

    return records


# -------- PROFILE --------
@app.get("/profile")
def get_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    transcript_count = db.query(Transcript).filter(
        Transcript.user_id == current_user.id
    ).count()

    return {
        "username": current_user.username,
        "transcript_count": transcript_count
    }