from typing import List

from .models import Movie, Review, ReviewIndex, StreamingService

from fastapi import APIRouter

movie_router = APIRouter()
review_router = APIRouter()


##################################
#            MOVIES              #
##################################
@movie_router.get("/", response_model=List[Movie])
def movie_index():
    """List all movies in the system and their associated metadata."""
    return [
        {
            "id": 1,
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
            "id": 2,
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


##################################
#            REVIEWS             #
##################################
@review_router.get("/", response_model=List[ReviewIndex])
def review_index():
    """List all existing reviews with some fields removed for brevity."""
    return [
        {
            "id": 1,
            "movie_title": "Pulp Fiction",
            "movie_year": 1994,
            "review_title": "Does he look like a bitch?",
            "rating": 5.0
        },
       {
           "id": 2,
           "movie_title": "Con Air",
           "movie_year": 1997,
           "review_title": "Being John Malkovich",
           "rating": 4.0
       }
    ]


@review_router.get("/{review_id}", response_model=Review)
def review(review_id: int):
    """Single movie review and all associated metadata."""
    return {
        "id": review_id,
        "movie": {
            "id": 1,
            "name": "Pulp Fiction",
            "year": 1994,
            "links": {
                "imdb": "https://www.imdb.com/title/tt0110912/"
            },
            "places_to_watch": {
                "Starz"
            }
        },
        "title": "Does he look like a bitch?",
        "body": "Thurman snorts heroin. Travolta stabs heart. "
                "Willis shoots Travolta. Jackson is on brain detail.",
        "rating": 5.0
    }