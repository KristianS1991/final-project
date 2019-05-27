from app import app
from controllers import orders, auth

app.register_blueprint(orders.router)
app.register_blueprint(auth.router)
