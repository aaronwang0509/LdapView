import os
from datetime import datetime, timedelta, UTC
from jose import jwt, JWTError
from core import config
from fastapi.security import OAuth2PasswordBearer
from cryptography.fernet import Fernet

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# Load key from env var or fallback to local file (dev only)
FERNET_KEY = os.environ.get("FERNET_KEY")
if not FERNET_KEY:
    # DEV ONLY fallback — generate once and reuse
    key_file = ".fernet.key"
    if os.path.exists(key_file):
        with open(key_file, "rb") as f:
            FERNET_KEY = f.read()
    else:
        FERNET_KEY = Fernet.generate_key()
        with open(key_file, "wb") as f:
            f.write(FERNET_KEY)

fernet = Fernet(FERNET_KEY)

def encrypt_password(raw_password: str) -> str:
    return fernet.encrypt(raw_password.encode()).decode()

def decrypt_password(encrypted_password: str) -> str:
    return fernet.decrypt(encrypted_password.encode()).decode()

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(UTC) + timedelta(minutes=config.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, config.SECRET_KEY, algorithm=config.ALGORITHM)

def decode_token(token: str):
    return jwt.decode(token, config.SECRET_KEY, algorithms=[config.ALGORITHM])


