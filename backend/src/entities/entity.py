import os 
from datetime import datetime
from sqlalchemy import create_engine, Column, String, Integer, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
from os.path import join, dirname

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)


# db_url = 'localhost:5432'
# db_name = 'super_cool_flashcards'
# db_user = os.environ.get('DB_USER')
# db_password = os.environ.get('DB_PASS')
# engine = create_engine(f'postgresql://{db_user}:{db_password}@{db_url}/{db_name}')


DATABASE_URL = os.environ.get('DATABASE_URL')
# DATABASE_URL = os.environ['DATABASE_URL']

print ("hello url")

# engine = create_engine(os.getenv("DATABASE_URL"))
engine = create_engine(DATABASE_URL, convert_unicode=True)
Session = sessionmaker(bind=engine)

Base = declarative_base()


class Entity():
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    last_updated_by = Column(String)

    def __init__(self, created_by):
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.last_updated_by = created_by