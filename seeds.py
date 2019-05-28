from pony.orm import db_session
from app import db
from models.Order import Order
from models.User import User, UserSchema

db.drop_all_tables(with_all_data=True)
db.create_tables()

with db_session():
    schema = UserSchema()
    kreeda = User(
        username='kreeda',
        email='kreeda@gmail.com',
        password_hash=schema.generate_hash('pass')
    )

    # orders
    Order(location="Franco Manca", postcode="GH12 7LL", delivery_method="courier pigeon", contents="food", user=kreeda)
    Order(location="Gap", postcode="E9 7HN", delivery_method="van", contents="clothes", user=kreeda)

    # save the data to the database
    db.commit()
