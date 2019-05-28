from app import app
from controllers import trips, auth, locations

app.register_blueprint(trips.router)
app.register_blueprint(locations.router)
app.register_blueprint(auth.router)
