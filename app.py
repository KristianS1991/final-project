from flask import Flask
from pony.orm import Database

app = Flask(__name__)
db = Database()
db.bind(provider='postgres', dbname='final-project-db')

# pylint: disable=W0611,C0413
from models.Order import Order # loads in the models and controllers

db.generate_mapping(create_tables=True)

@app.route('/')
def index():
    return 'Hello there', 200
