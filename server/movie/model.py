from enum import Enum
from typing import Dict, Set

from pydantic import AnyHttpUrl, BaseModel


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
    links: Dict[str, AnyHttpUrl]
    places_to_watch: Set[StreamingService]
