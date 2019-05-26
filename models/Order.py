from pony.orm import Required, Optional
from app import db

class Order(db.Entity):
    location = Required(str)
    postcode = Required(str)
    delivery_method = Required(str)
    contents = Optional(str)
