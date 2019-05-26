from pony.orm import db_session
from app import db
from models.Order import Order

db.drop_all_tables(with_all_data=True)
db.create_tables()

with db_session():

    # create some cars
    Order(location="Franco Manca", postcode="GH12 7LL", delivery_method="courier pigeon", contents="food")
    Order(location="Gap", postcode="E9 7HN", delivery_method="van", contents="clothes")

    # save the data to the database
    db.commit()
