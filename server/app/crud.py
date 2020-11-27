from typing import List

from .database import db
from .schemas import Review, ReviewIndex, ReviewUpdate


def get_review_index() -> List[ReviewIndex]:
    """Get all existing reviews with some fields omitted"""
    reviews = db.reviews.find()
    return [
        ReviewIndex(
            movie_name=review.get("movie", {}).get("name"),
            movie_year=review.get("movie", {}).get("year"),
            review_title=review.get("title"),
            trimmed_body=review.get("body", "")[:100] + "...",
            cover_img=review.get("movie", {}).get("cover"),
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


def update_movie_by_movie_name(movie_name: str, review_update: ReviewUpdate) -> Review:
    """Find a review by movie name and update it with the given fields"""
    query = {"movie.name": movie_name}
    update_data = {k: v for k, v in review_update.dict().items() if v is not None}
    db.reviews.update_one(query, {"$set": update_data})
    return db.reviews.find_one(query)
