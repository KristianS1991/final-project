from flask import Blueprint, jsonify, request, abort
from marshmallow import ValidationError
from pony.orm import db_session
from models.Location import Location, LocationSchema
from models.Trip import Trip
from app import db
from lib.secure_route import secure_route

router = Blueprint(__name__, 'locations')

# Index route for all orders
@router.route('/locations', methods=['GET'])
@db_session
def index():
    schema = LocationSchema(many=True)
    locations = Location.select()

    return schema.dumps(locations)

#show route for particular order based on id
@router.route('/locations/<int:location_id>', methods=['GET'])
@db_session
def show(location_id):
    schema = LocationSchema()
    location = Location.get(id=location_id)

    if not location:
        abort(404)

    return schema.dumps(location)

# create route for creating a location
@router.route('/locations/<string:trip_name>', methods=['POST'])
@db_session
@secure_route
def create(trip_name):
    schema = LocationSchema()

    try:
        data = schema.load(request.get_json())
        trip = Trip.get(name=trip_name)
        data['trip'] = trip

        location = Location(**data)
        db.commit()
    except ValidationError as err:
        return jsonify({'message': 'Validation failed', 'errors': err.messages}), 422

    return schema.dumps(location), 201

#update route for updating an order
@router.route('/locations/<int:location_id>', methods=['PUT'])
@db_session
@secure_route
def update(location_id):
    schema = LocationSchema()
    location = Location.get(id=location_id)

    if not location:
        abort(404)

    try:
        data = schema.load(request.get_json())
        location.set(**data)
        db.commit()
    except ValidationError as err:
        return jsonify({'message': 'Validation failed', 'errors': err.messages}), 422

    return schema.dumps(location)

#delete route - delete an order
@router.route('/locations/<int:location_id>', methods=['DELETE'])
@db_session
@secure_route
def delete(location_id):
    location = Location.get(id=location_id)

    if not location:
        abort(404)

    location.delete()
    db.commit()

    return '', 204
