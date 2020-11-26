from .routes import review_router

from fastapi import FastAPI

app = FastAPI()

app.include_router(
    review_router,
    prefix="/reviews",
    tags=["Reviews"],
    responses={404: {"description": "Not Found"}},
)


@app.get("/")
async def root():
    return {"message": "Movie Review API Index"}
