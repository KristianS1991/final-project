from pony.orm import Required, Optional
from marshmallow import Schema, fields
from app import db

class Order(db.Entity):
    location = Required(str)
    postcode = Required(str)
    delivery_method = Required(str)
    contents = Optional(str)

class OrderSchema(Schema):
    id = fields.Int(dump_only=True)
    location = fields.String(required=True)
    postcode = fields.String(required=True)
    delivery_method = fields.String(required=True)
    contents = fields.String()
