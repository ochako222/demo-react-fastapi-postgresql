from sqlalchemy.orm import Mapped, mapped_column

from . import Base


class Article(Base):
    __tablename__ = "article"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, index=True)
    date_creation: Mapped[str] = mapped_column(index=True, unique=True)
    title: Mapped[str]
    markdown: Mapped[str]
    thumbnail: Mapped[str]
    color: Mapped[str]