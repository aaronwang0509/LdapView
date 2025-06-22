import os
import json
from core import db, config

def init_database_folder():
    if not os.path.exists(config.DATABASE_FOLDER):
        os.makedirs(config.DATABASE_FOLDER)

def init_db():
    db.init_db()

def init_user_file():
    if not os.path.exists(config.USER_FILE):
        with open(config.USER_FILE, "w") as f:
            json.dump({"users": []}, f)

def run_all():
    init_database_folder()
    init_db()
    init_user_file()