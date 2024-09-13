from typing import List
from app.api.dependencies.core import DBSessionDep
from app.crud.article import create_article, get_article,get_all_articles,delete_article_by_id
from app.schemas.article import Article
from fastapi import APIRouter, Depends, HTTPException

router = APIRouter(
    prefix="/api/articles",
    tags=["articles"],
    responses={404: {"description": "Article not found"}},
)

@router.get(
    "/{article_id}",
    response_model=Article
)

async def article_details(
    article_id: int,
    db_session: DBSessionDep,
):
    """
    Get any article details
    """
    return await get_article(db_session, article_id)


@router.post(
    "/",
     response_model=Article,
    tags=["articles"],
)
async def create_new_article(
    article_data: Article,
    db_session: DBSessionDep
):
    """
    Create a new article
    """
    await create_article(db_session,article_data)

@router.get(
    "/",
    response_model=List[Article]
)
async def get_articles(
    db_session: DBSessionDep
):
    """
    Get all articles
    """
    return await get_all_articles(db_session)


@router.delete(
    "/{article_id}",
    response_model=Article
)
async def delete_article(
    article_id: int,
    db_session: DBSessionDep
):
    """
    Delete an article
    """
    return await delete_article_by_id(db_session,article_id)