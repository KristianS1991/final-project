from flask import Blueprint, jsonify, request, abort
from marshmallow import ValidationError
from pony.orm import db_session
from models.User import User, UserSchema
from app import db
from lib.secure_route import secure_route

router = Blueprint(__name__, 'users')

# Index route for all orders
@router.route('/users', methods=['GET'])
@db_session
def index():
    schema = UserSchema(many=True)
    users = User.select()
    return schema.dumps(users)

#show route for particular order based on id
@router.route('/users/<int:user_id>', methods=['GET'])
@db_session
@secure_route
def show(user_id):
    schema = UserSchema()
    user = User.get(id=user_id)

    if not user:
        abort(404)

    return schema.dumps(user)

#update route for updating an order
@router.route('/users/<int:user_id>', methods=['PUT'])
@db_session
@secure_route
def update(user_id):
    schema = UserSchema()
    user = User.get(id=user_id)

    if not user:
        abort(404)

    try:
        data = schema.load(request.get_json())
        user.set(**data)
        db.commit()
    except ValidationError as err:
        return jsonify({'message': 'Validation failed', 'errors': err.messages}), 422

    return schema.dumps(user)

#delete route - delete an order
@router.route('/users/<int:user_id>', methods=['DELETE'])
@db_session
@secure_route
def delete(user_id):
    user = User.get(id=user_id)

    if not user:
        abort(404)

    user.delete()
    db.commit()

    return '', 204
