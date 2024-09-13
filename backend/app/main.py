import logging
import sys
from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI

from app.api.routers.users import router as users_router
from app.api.routers.articles import router as article_router
from app.config import settings
from app.database import sessionmanager

logging.basicConfig(stream=sys.stdout, level=logging.DEBUG if settings.log_level == "DEBUG" else logging.INFO)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Function that handles startup and shutdown events.
    To understand more, read https://fastapi.tiangolo.com/advanced/events/
    """
    yield
    if sessionmanager._engine is not None:
        # Close the DB connection
        await sessionmanager.close()


app = FastAPI(lifespan=lifespan, title=settings.project_name, docs_url="/api/docs")


@app.get("/")
async def root():
    return {"message": "Hello Curies!!!"}


# Routers
app.include_router(article_router)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8000)