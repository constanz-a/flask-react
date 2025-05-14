
SQLITE = "sqlite:///contacts.db"
POSTGRESQL = "postgresql+psycopg2://postgres:postgres@localhost:5432/contacts"


class Config:

    DEBUG = True
    SECRET_KEY = 'dev'
    SQLALCHEMY_DATABASE_URI = SQLITE
    CKEDITOR_PKG_TYPE = 'full'


def sql():
    return SQLITE



        