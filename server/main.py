# main.py
from fastapi import FastAPI, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, String
from pydantic import BaseModel

DATABASE_URL = "postgresql+asyncpg://postgres:password@localhost:5432/app_db"

# SQLAlchemy setup
engine = create_async_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, class_=AsyncSession)
Base = declarative_base()

# Define a sample model
class Post(Base):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(String)

# Pydantic models for request/response
class PostCreate(BaseModel):
    title: str
    content: str

class PostRead(BaseModel):
    id: int
    title: str
    content: str

    class Config:
        orm_mode = True

app = FastAPI()

# Dependency to get DB session
async def get_db():
    async with SessionLocal() as session:
        yield session

# Route to create a post
@app.post("/posts/", response_model=PostRead)
async def create_post(post: PostCreate, db: AsyncSession = Depends(get_db)):
    new_post = Post(title=post.title, content=post.content)
    db.add(new_post)
    await db.commit()
    await db.refresh(new_post)
    return new_post

# Route to get all posts
@app.get("/posts/", response_model=List[PostRead])
async def read_posts(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Post))
    posts = result.scalars().all()
    return posts