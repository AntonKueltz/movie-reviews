from enum import Enum
from typing import Dict, List, Optional

from pydantic import AnyUrl, AnyHttpUrl, BaseModel


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
    name: str
    year: int
    cover: AnyHttpUrl
    links: Dict[str, AnyHttpUrl]
    places_to_watch: List[StreamingService]


##################################
#            REVIEWS             #
##################################
class Review(BaseModel):
    movie: Movie
    title: str
    body: str
    rating: float


class ReviewIndex(BaseModel):
    # omit bodies and movie metadata here since this is an overview
    movie_name: str
    movie_year: int
    review_title: str
    trimmed_body: str
    cover_img: AnyUrl
    rating: float


class ReviewUpdate(BaseModel):
    title: Optional[str] = None
    body: Optional[str] = None
    rating: Optional[float] = None
