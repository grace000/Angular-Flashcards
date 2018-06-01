
from .entities.entity import Session, engine, Base
from .entities.flashcard import Flashcard

# generate database schema
Base.metadata.create_all(engine)

# start session
session = Session()

# check for existing data
flashcards = session.query(Flashcard).all()

if len(flashcards) == 0:
    # create and persist dummy flashcard
    python_flashcard = Flashcard("SQLAlchemy Flashcards", "Test your knowledge about SQLAlchemy.", "script")
    session.add(python_flashcard)
    session.commit()
    session.close()

    # reload flashcards
    flashcards = session.query(Flashcard).all()

# show existing flashcards
print('### Flashscards:')
for flashcard in flashcards:
    print(f'({flashcard.id}) {flashcard.title} - {flashcard.description}')