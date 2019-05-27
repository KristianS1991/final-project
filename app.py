from flask import Flask, jsonify
from pony.orm import Database

app = Flask(__name__)
db = Database()
db.bind(provider='postgres', dbname='final-project-db')

# pylint: disable=W0611,C0413
from config import routes # loads in the models and controllers

db.generate_mapping(create_tables=True)

@app.errorhandler(404)
def not_found(_error):
    return jsonify({'message': 'Not found'}), 404
