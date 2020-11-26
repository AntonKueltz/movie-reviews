from movie.routes import movie_router

from fastapi import FastAPI

app = FastAPI()

app.include_router(
    movie_router,
    prefix="/movies",
    tags=["Movies"],
    responses={404: {"description": "Not Found"}},
)


@app.get("/")
async def root():
    return {"message": "Movie Review API Index"}
