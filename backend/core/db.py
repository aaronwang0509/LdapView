import json
import os
from sqlmodel import SQLModel, Session, create_engine
from models.db_models import IdentityUser, UserProfile, LDAPConnection
from core import config

# === File-based user store (temporary IdP layer) ===
def load_users():
    if not os.path.exists(config.USER_FILE):
        return {"users": []}
    with open(config.USER_FILE, "r") as f:
        return json.load(f)

def save_users(users):
    with open(config.USER_FILE, "w") as f:
        json.dump(users, f, indent=2)

# === Business SQLModel DB ===
engine = create_engine(config.DATABASE_URL, echo=True)

def init_db():
    SQLModel.metadata.create_all(engine)

def get_session():
    return Session(engine)