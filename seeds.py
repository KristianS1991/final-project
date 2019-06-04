from pony.orm import db_session
from app import db
from models.Trip import Trip
from models.Location import Location
from models.User import User, UserSchema

db.drop_all_tables(with_all_data=True)
db.create_tables()

with db_session():
    #User
    schema = UserSchema()
    Kristian = User(
        username='Kristian',
        email='Kristian@gmail.com',
        password_hash=schema.generate_hash('pass')
    )

    # Trips
    trip_one = Trip(name="Trip One", user=Kristian)
    trip_two = Trip(name="Trip Two", user=Kristian)

    # Locations - Trip One
    location_one = Location(name="Clapham Junction", postcode="SW111PW", latitude=51.4652, longitude=-0.1708, trip=trip_one)
    location_two = Location(name="Vauxhall", postcode="SW84ET", latitude=51.4862, longitude=-0.1229, trip=trip_one)
    location_three = Location(name="Southfields", postcode="SW196LL", latitude=51.4448, longitude=-0.2068, trip=trip_one)
    
    # Locations - Trip Two
    location_four = Location(name="Bethnal Green", postcode="E20ET", latitude=51.5273, longitude=0.0555, trip=trip_two)
    location_five = Location(name="Mile End", postcode="E34PH", latitude=51.5251, longitude=0.0334, trip=trip_two)
    location_six = Location(name="Stratford", postcode="E201EJ", latitude=51.5413, longitude=0.0032, trip=trip_two)

    # save the data to the database
    db.commit()
