from .config import origins
from .routes import auth_router, review_router

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    review_router,
    prefix="/reviews",
    tags=["Reviews"],
    responses={404: {"description": "Not Found"}},
)

app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Auth"],
    responses={404: {"description": "Not Found"}},
)


@app.get("/")
async def root():
    return {"message": "Movie Review API Index"}
