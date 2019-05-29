from pony.orm import db_session
from app import db
from models.Trip import Trip
from models.Location import Location
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

    # Trips
    trip_one = Trip(name="Trip One", user=kreeda)
    trip_two = Trip(name="Trip Two", user=kreeda)

    # Locations
    location_one = Location(name="Taj Mahal", postcode="e4 7hj", trip=trip_one)
    location_two = Location(name="Arizona", postcode="e5 4gf", trip=trip_one)
    location_three = Location(name="Jacksonville", postcode="f6 7hj", trip=trip_one)

    location_four = Location(name="Denver", postcode="e7 9ab", trip=trip_two)
    location_five = Location(name="Tampa", postcode="e7 9ab", trip=trip_two)
    location_four = Location(name="Compton", postcode="e7 9ab", trip=trip_two)

    # save the data to the database
    db.commit()
