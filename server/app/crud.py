from typing import List

from .config import app_key
from .database import db
from .schemas import Review, ReviewIndex, ReviewUpdate

from argon2 import PasswordHasher
from itsdangerous import BadTimeSignature, TimestampSigner

hasher = PasswordHasher()
signer = TimestampSigner(app_key)


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


def check_login(username: str, password: str) -> bool:
    """Attempt to authenticate a user with given credentials"""
    user_data = db.users.find_one({"username": username})

    # no user exists with the given username
    if not user_data:
        return False

    # wrong / bad password provided
    if not hasher.verify(user_data.get("password_hash", ""), password):
        return False

    return True


def generate_token(username: str) -> bytes:
    """Create a "signed" token for authentication that encodes the username"""
    return signer.sign(username)


def validate_token(token: bytes) -> bool:
    """Validate token and return whether user has write perms"""
    try:
        username = signer.unsign(token, max_age=86400)  # 86400 = 1 day in seconds
    except BadTimeSignature:
        return False

    user_data = db.users.find_one({"username": username.decode()})
    print(username, user_data)
    if not user_data or not user_data.get("username"):
        return False

    return user_data.get("username") == "admin"
