from typing import List

from .database import db
from .schemas import Review, ReviewIndex


def get_review_index() -> List[ReviewIndex]:
    """Get all existing reviews with some fields omitted"""
    reviews = db.reviews.find()
    return [
        ReviewIndex(
            movie_name=review.get("movie", {}).get("name"),
            movie_year=review.get("movie", {}).get("year"),
            review_title=review.get("title"),
            rating=review.get("rating")
        )
        for review in reviews
    ]


def new_review(review: Review) -> int:
    """Create a new review in the db and return the document id"""
    review_json_data = review.dict()
    return db.reviews.insert_one(review_json_data).inserted_id


def get_review_by_movie_name(movie_name: str) -> Review:
    """Find a review given the movie name"""
    return db.reviews.find_one({"movie.name": movie_name})