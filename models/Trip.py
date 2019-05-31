from pony.orm import Required, Set
from marshmallow import Schema, fields
from app import db

class Trip(db.Entity):
    name = Required(str)
    user = Required('User')
    locations = Set('Location')

class TripSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.String(required=True)
    user = fields.Nested('UserSchema', exclude=('trips',)) #exclude trips here?
    locations = fields.Nested('LocationSchema', many=True)
