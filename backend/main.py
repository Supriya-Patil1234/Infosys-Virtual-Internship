from transformers import T5Tokenizer, T5ForConditionalGeneration
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

from database import engine, SessionLocal
from models import Base, User, Transcript

# -----------------------------
# APP INIT
# -----------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# SECURITY CONFIG
# -----------------------------
SECRET_KEY = "supersecretkey123"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# -----------------------------
# REQUEST MODELS
# -----------------------------
class AuthRequest(BaseModel):
    username: str
    password: str

# -----------------------------
# HELPER FUNCTIONS
# -----------------------------
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

# -----------------------------
# LOAD WHISPER MODEL
# -----------------------------
UPLOAD_FOLDER = "uploads"

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

print("Loading Whisper model...")
whisper_model = whisper.load_model("tiny")
print("Whisper model loaded")

# -----------------------------
# LOAD HUGGING FACE T5 MODEL
# -----------------------------
print("Loading T5 summarization model...")
tokenizer = T5Tokenizer.from_pretrained("t5-small")
t5_model = T5ForConditionalGeneration.from_pretrained("t5-small")
print("T5 model loaded")

def generate_summary(text: str):
    if not text.strip():
        return ""

    input_text = "summarize: " + text
    inputs = tokenizer.encode(
        input_text,
        return_tensors="pt",
        max_length=512,
        truncation=True
    )

    outputs = t5_model.generate(
        inputs,
        max_length=120,
        min_length=30,
        length_penalty=2.0,
        num_beams=4,
        early_stopping=True
    )

    summary = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return summary

# -----------------------------
# ROUTES
# -----------------------------
@app.get("/")
def home():
    return {"message": "Backend running securely with HuggingFace"}

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

# -------- UPLOAD (TRANSCRIBE + SUMMARIZE) --------
@app.post("/upload")
async def upload(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    file_path = f"{UPLOAD_FOLDER}/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Transcription
    result = whisper_model.transcribe(file_path)
    transcript = result["text"]

    # Summarization using Hugging Face
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