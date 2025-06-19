from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.requests import Request
from fastapi import HTTPException
from api import auth, business, admin
from core.init import run_all

app = FastAPI()

run_all()

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal Server Error"}
    )

# Mount routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(business.router, prefix="/api", tags=["Business APIs"])
app.include_router(admin.router, prefix="/admin", tags=["Admin APIs"])