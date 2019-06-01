import requests
from pony.orm import Required, Optional
from marshmallow import Schema, fields, post_load
from app import db

from .Trip import Trip

class Location(db.Entity):
    name = Required(str)
    postcode = Required(str)
    trip = Required('Trip')
    longitude = Optional(float)
    latitude = Optional(float)

class LocationSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.String(required=True)
    postcode = fields.String(required=True)
    trip = fields.Nested('TripSchema', exclude=('locations', 'user', 'id'), dump_only=True)
    longitude = fields.Float(dump_only=True)
    latitude = fields.Float(dump_only=True)


    @post_load
    def get_lat_lng(self, data):
        response = requests.get('https://api.postcodes.io/postcodes/%s' % data['postcode'])
        info = response.json()['result']
        data['latitude'] = info['latitude']
        data['longitude'] = info['longitude']

        return data
