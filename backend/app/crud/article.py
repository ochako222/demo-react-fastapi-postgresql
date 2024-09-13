from app.models import Article as ArticleDBModel
from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas.article import Article


async def get_article(db_session: AsyncSession, article_id: int):
    article = (await db_session.scalars(select(ArticleDBModel).where(ArticleDBModel.id == article_id))).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article

async def create_article(db_session: AsyncSession, article_data: Article):
    article = ArticleDBModel(**article_data.model_dump())
    db_session.add(article)
    await db_session.commit()
    return article

async def get_all_articles(db_session: AsyncSession):
    articles = await db_session.scalars(select(ArticleDBModel))
    if not articles:
        raise HTTPException(status_code=404, detail="No articles found")
    return articles