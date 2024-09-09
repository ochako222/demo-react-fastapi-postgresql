from app.api.dependencies.auth import validate_is_authenticated
from app.api.dependencies.core import DBSessionDep
from app.crud.user import get_article
from app.schemas.user import Article
from fastapi import APIRouter, Depends

router = APIRouter(
    prefix="/api/articles",
    tags=["articles"],
    responses={404: {"description": "Article not found"}},
)

@router.get(
    "/{article_id}",
    response_model=Article,
    dependencies=[Depends(validate_is_authenticated)],
)

async def article_details(
    article_id: int,
    db_session: DBSessionDep,
):
    """
    Get any article details
    """
    article = await get_article(db_session, article_id)
    return article