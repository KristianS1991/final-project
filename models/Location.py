from pony.orm import Required
from marshmallow import Schema, fields
from app import db

class Location(db.Entity):
    name = Required(str)
    postcode = Required(str)
    trip = Required('Trip')

class LocationSchema(Schema):
    #id = fields.Int(dump_only=True)
    name = fields.String(required=True)
    postcode = fields.String(required=True)
    #trip = fields.Nested('TripSchema')
