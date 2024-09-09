from app.models import Article as ArticleDBModel
from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession


async def get_article(db_session: AsyncSession, article_id: int):
    article = (await db_session.scalars(select(ArticleDBModel).where(ArticleDBModel.id == article_id))).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article

