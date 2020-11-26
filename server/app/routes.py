from typing import List

from .crud import get_review_by_movie_name, get_review_index, new_review
from .schemas import Review, ReviewIndex

from fastapi import APIRouter

review_router = APIRouter()


##################################
#            REVIEWS             #
##################################
@review_router.get("/", response_model=List[ReviewIndex])
def review_index():
    """List all existing reviews with some fields removed for brevity."""
    return get_review_index()


@review_router.post("/", status_code=201)
def create_review(review_data: Review):
    """Create a new review for a movie."""
    review_id = new_review(review_data)
    return {"id": str(review_id)}


@review_router.get("/{movie_name}", response_model=Review)
def review(movie_name: str):
    """Get a movie review by movie name."""
    return get_review_by_movie_name(movie_name)
