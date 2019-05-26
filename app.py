from flask import Flask
from pony.orm import Database, db_session

app = Flask(__name__)
db = Database()
db.bind(provider='postgres', dbname='final-project-db')

# pylint: disable=W0611,C0413
from models.Order import Order, OrderSchema # loads in the models and controllers

db.generate_mapping(create_tables=True)

order_schema = OrderSchema(many=True)

@app.route('/')
def home():
    return 'Hello there', 200

@app.route('/orders')
@db_session
def index():
    orders = Order.select()

    return order_schema.dumps(orders), 200
