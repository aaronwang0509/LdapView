DATABASE_FOLDER = "data"
SECRET_KEY = "super-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
# ACCESS_TOKEN_EXPIRE_MINUTES = 1  # for testing purposes
USER_FILE = "data/users.json"
DATABASE_URL = "sqlite:///./data/app.db"
REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24 * 1  # 1 days
# REFRESH_TOKEN_EXPIRE_MINUTES = 2  # for testing purposes
REFRESH_SECRET_KEY = "another-super-secret-key"
