from enum import Enum
from typing import Dict, Set

from pydantic import AnyHttpUrl, BaseModel


##################################
#            MOVIES              #
##################################
class StreamingService(str, Enum):
    NETFLIX = "Netflix"
    AMAZON = "Amazon"
    HBO = "HBO"
    HULU = "Hulu"
    DISNEY_PLUS = "Disney+"
    APPLE_TV = "Apple TV"
    STARZ = "Starz"


class Movie(BaseModel):
    id: int
    name: str
    year: int
    links: Dict[str, AnyHttpUrl]
    places_to_watch: Set[StreamingService]


##################################
#            REVIEWS             #
##################################
class Review(BaseModel):
    id: int
    movie: Movie
    title: str
    body: str
    rating: float


class ReviewIndex(BaseModel):
    # omit bodies and movie metadata here since this is an overview
    id: int
    movie_title: str
    movie_year: int
    review_title: str
    rating: float
