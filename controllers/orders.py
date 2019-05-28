from flask import Blueprint, jsonify, request, abort, g
from marshmallow import ValidationError
from pony.orm import db_session
from models.Order import Order, OrderSchema
from app import db
from lib.secure_route import secure_route

router = Blueprint(__name__, 'orders')

# Index route for all orders
@router.route('/orders', methods=['GET'])
@db_session
def index():
    schema = OrderSchema(many=True)
    orders = Order.select()

    return schema.dumps(orders)

#show route for particular order based on id
@router.route('/orders/<int:order_id>', methods=['GET'])
@db_session
def show(order_id):
    schema = OrderSchema()
    order = Order.get(id=order_id)

    if not order:
        abort(404)

    return schema.dumps(order)

# create route for creating an order
@router.route('/orders', methods=['POST'])
@db_session
@secure_route
def create():
    schema = OrderSchema()

    try:
        data = schema.load(request.get_json())
        data['user'] = g.current_user
        order = Order(**data)
        db.commit()
    except ValidationError as err:
        return jsonify({'message': 'Validation failed', 'errors': err.messages}), 422

    return schema.dumps(order), 201

#update route for updating an order
@router.route('/orders/<int:order_id>', methods=['PUT'])
@db_session
@secure_route
def update(order_id):
    schema = OrderSchema()
    order = Order.get(id=order_id)

    if not order:
        abort(404)

    try:
        data = schema.load(request.get_json())
        order.set(**data)
        db.commit()
    except ValidationError as err:
        return jsonify({'message': 'Validation failed', 'errors': err.messages}), 422

    return schema.dumps(order)

#delete route - delete an order
@router.route('/orders/<int:order_id>', methods=['DELETE'])
@db_session
@secure_route
def delete(order_id):
    order = Order.get(id=order_id)

    if not order:
        abort(404)

    order.delete()
    db.commit()

    return '', 204
