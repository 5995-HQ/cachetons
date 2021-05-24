from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base
import os

engine = create_engine(os.environ.get("DB_URL", "postgresql://localhost:5432/cachetons"), convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()


def init_db():
    import api.models

    Base.metadata.create_all(bind=engine)
