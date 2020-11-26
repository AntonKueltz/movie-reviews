from typing import Optional, List

from .model import Movie, StreamingService

from fastapi import APIRouter

movie_router = APIRouter()


@movie_router.get("/", response_model=List[Movie])
def movie_index(fields: Optional[List[str]] = None):
    if fields:
        pass
    return [
        {
            "name": "Pulp Fiction",
            "year": 1994,
            "links": {
                "imdb": "https://www.imdb.com/title/tt0110912/"
            },
            "places_to_watch": {
                StreamingService.STARZ
            }
        },
        {
            "name": "Con Air",
            "year": 1997,
            "links": {
                "imdb": "https://www.imdb.com/title/tt0118880/"
            },
            "places_to_watch": {
                StreamingService.NETFLIX
            }
        }
    ]