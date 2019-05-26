from flask import Flask
from pony.orm import Database

app = Flask(__name__)
db = Database()
db.bind(provider='postgres', dbname='final-project-db')

db.generate_mapping(create_tables=True)

@app.route('/')
def index():
    return 'Hello there', 200
