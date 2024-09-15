from app.models import Article as ArticleDBModel
from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas.article import ArticleCreate

async def get_article(db_session: AsyncSession, article_id: int):
    article = (await db_session.scalars(select(ArticleDBModel).where(ArticleDBModel.id == article_id))).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article

async def create_article(db_session: AsyncSession, article_data: ArticleCreate):
    article = ArticleDBModel(**article_data.model_dump())
    db_session.add(article)
    await db_session.commit()
    return article
    
async def get_all_articles(db_session: AsyncSession):
    articles = await db_session.scalars(select(ArticleDBModel))
    if not articles:
        raise HTTPException(status_code=404, detail="There are no articles")
    return articles

async def delete_article_by_id(db_session: AsyncSession, article_id: int):
    article = await get_article(db_session, article_id)
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    await db_session.delete(article)
    await db_session.commit()
