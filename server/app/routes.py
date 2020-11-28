from typing import List

from .crud import (
    check_login,
    generate_token,
    get_review_by_movie_name,
    get_review_index,
    new_review,
    update_movie_by_movie_name,
    validate_token,
)
from .schemas import Review, ReviewIndex, ReviewUpdate

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

review_router = APIRouter()
auth_router = APIRouter()

# all "write" routes require authentication
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")


##################################
#            REVIEWS             #
##################################
@review_router.get("/", response_model=List[ReviewIndex])
def review_index():
    """List all existing reviews with some fields removed for brevity."""
    return get_review_index()


@review_router.post("/", status_code=201)
def create_review(review_data: Review, token: bytes = Depends(oauth2_scheme)):
    """Create a new review for a movie."""
    if not validate_token(token):
        raise HTTPException(status_code=403, detail="Forbidden")

    review_id = new_review(review_data)
    return {"id": str(review_id)}


@review_router.get("/{movie_name}", response_model=Review)
def get_review(movie_name: str):
    """Get a movie review by movie name."""
    return get_review_by_movie_name(movie_name)


@review_router.patch("/{movie_name}", response_model=Review)
def update_review(movie_name: str, review_data: ReviewUpdate, token: bytes = Depends(oauth2_scheme)):
    """Update the a movie review"""
    if not validate_token(token):
        raise HTTPException(status_code=403, detail="Forbidden")

    return update_movie_by_movie_name(movie_name, review_data)


##################################
#             AUTH               #
##################################
@auth_router.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """Get a Oauth2 token via username and password."""
    if not check_login(form_data.username, form_data.password):
        raise HTTPException(status_code=401, detail="Unauthorized")

    token = generate_token(form_data.username)
    return {"access_token": token, "token_type": "bearer"}
