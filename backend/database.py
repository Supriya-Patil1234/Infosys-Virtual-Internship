# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker, declarative_base

# DATABASE_URL = "postgresql://postgres:Srp151@6@localhost:5432/transcribeflow"

# engine = create_engine(DATABASE_URL)

# SessionLocal = sessionmaker(bind=engine)

# Base = declarative_base()
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from urllib.parse import quote_plus

DB_USER = "postgres"
DB_PASSWORD = quote_plus("Srp151@6")   # IMPORTANT FIX
DB_HOST = "localhost"
DB_PORT = "5432"
DB_NAME = "transcribeflow"

DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()