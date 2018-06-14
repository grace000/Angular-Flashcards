from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin, logging

from .entities.entity import Session, engine, Base
from .entities.flashcard import Flashcard, FlashcardSchema
from .auth import AuthError, requires_auth, requires_role



# creating the Flask application
app = Flask(__name__)
CORS(app)

# generate database schema
Base.metadata.create_all(engine)

@app.route('/flashcards')
def get_flashcards():
    # fetching from the database
    session = Session()
    flashcard_objects = session.query(Flashcard).all()

    # transforming into JSON-serializable objects
    schema = FlashcardSchema(many=True)
    flashcards = schema.dump(flashcard_objects)

    # serializing as JSON
    session.close()
    return jsonify(flashcards.data)


@app.route('/flashcards', methods=['POST'])
@requires_auth
def add_flashcard():

    # mount flashcard object
    posted_flashcard = FlashcardSchema(only=('title', 'description'))\
        .load(request.get_json())
    flashcard = Flashcard(**posted_flashcard.data, created_by="HTTP post request")

    # persist flashcard
    session = Session()
    session.add(flashcard)
    session.commit()

    # return created flashcard
    new_flashcard = FlashcardSchema().dump(flashcard).data
    session.close()
    return jsonify(new_flashcard), 201

@app.route('/flashcards/<flashcardId>', methods=['DELETE'])
@requires_role('admin')
def delete_flashcard(flashcardId):
    session = Session()
    flashcard = session.query(Flashcard).filter_by(id=flashcardId).first()
    session.delete(flashcard)
    session.commit()
    session.close()
    return '', 201

@app.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response