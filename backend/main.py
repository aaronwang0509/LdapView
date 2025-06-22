import os
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.requests import Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
from fastapi.staticfiles import StaticFiles
from starlette.responses import FileResponse
from api import auth, business, admin
from core.init import run_all
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

run_all()

# Mount routers first
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(business.router, prefix="/api", tags=["Business APIs"])
app.include_router(admin.router, prefix="/admin", tags=["Admin APIs"])

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal Server Error"}
    )

# Check environment mode
uvicorn_mode = os.getenv("UVICORN_MODE", "development")
if uvicorn_mode == "production":
    # Serve static frontend files in production
    frontend_build_dir = os.getenv("FRONTEND_BUILD_DIR", "../frontend/build")
    app.mount("/static", StaticFiles(directory=frontend_build_dir + "/static"), name="static")

    @app.get("/{full_path:path}")
    async def serve_react_app(full_path: str):
        return FileResponse(frontend_build_dir + "/index.html")
else:
    # Enable CORS in development mode
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[os.getenv("FRONTEND_ORIGIN")],
        allow_credentials=True,
        allow_methods=["*"], 
        allow_headers=["*"],
    )
