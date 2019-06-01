from app import app
from controllers import trips, auth, locations

app.register_blueprint(trips.router, url_prefix='/api')
app.register_blueprint(auth.router, url_prefix='/api')
# app.register_blueprint(locations.router, url_prefix='/api')
# app.register_blueprint(users.router, url_prefix='/api')
