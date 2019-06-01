from flask import Blueprint, jsonify, request, abort, g
from marshmallow import ValidationError
from pony.orm import db_session
from models.Trip import Trip, TripSchema
from models.Location import Location, LocationSchema
from app import db
from lib.secure_route import secure_route

router = Blueprint(__name__, 'trips')

# Index route for all orders
@router.route('/trips', methods=['GET'])
@db_session
def index():
    schema = TripSchema(many=True)
    trips = Trip.select()

    return schema.dumps(trips)

#show route for particular order based on id
@router.route('/trips/<int:trip_id>', methods=['GET'])
@db_session
def show(trip_id):
    schema = TripSchema()
    trip = Trip.get(id=trip_id)

    if not trip:
        abort(404)

    return schema.dumps(trip)

# create route for creating an order
@router.route('/trips', methods=['POST'])
@db_session
@secure_route
def create():
    schema = TripSchema()

    try:
        data = schema.load(request.get_json())
        print(data)
        # data['user'] = g.current_user
        trip = Trip(**data, user=g.current_user)
        db.commit()
    except ValidationError as err:
        return jsonify({'message': 'Validation failed', 'errors': err.messages}), 422

    return schema.dumps(trip), 201

#update route for updating an order
@router.route('/trips/<int:trip_id>', methods=['PUT'])
@db_session
@secure_route
def update(trip_id):
    schema = TripSchema()
    trip = Trip.get(id=trip_id)

    if not trip:
        abort(404)

    try:
        data = schema.load(request.get_json())
        trip.set(**data)
        db.commit()
    except ValidationError as err:
        return jsonify({'message': 'Validation failed', 'errors': err.messages}), 422

    return schema.dumps(trip)

#delete route - delete an order
@router.route('/trips/<int:trip_id>', methods=['DELETE'])
@db_session
@secure_route
def delete(trip_id):
    trip = Trip.get(id=trip_id)

    if not trip:
        abort(404)

    trip.delete()
    db.commit()

    return '', 204


# create route for creating a location
@router.route('/trips/<int:trip_id>/locations', methods=['POST'])
@db_session
@secure_route
def create_location(trip_id):
    location_schema = LocationSchema()
    trip_schema = TripSchema()

    trip = Trip.get(id=trip_id)

    try:
        data = location_schema.load(request.get_json())
        print(data)
        Location(**data, trip=trip)
        db.commit()
    except ValidationError as err:
        return jsonify({'message': 'Validation failed', 'errors': err.messages}), 422

    return trip_schema.dumps(trip), 200

#
#delete route - delete an order
@router.route('/trips/<int:trip_id>/locations/<int:location_id>', methods=['DELETE'])
@db_session
@secure_route
def delete_location(location_id, trip_id):
    location = Location.get(id=location_id)

    trip_schema = TripSchema()
    trip = Trip.get(id=trip_id)

    if not location:
        abort(404)

    location.delete()
    db.commit()

    return trip_schema.dumps(trip), 200
