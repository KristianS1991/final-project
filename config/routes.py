import os
from flask import abort
from app import app
from controllers import trips, auth

app.register_blueprint(trips.router, url_prefix='/api')
app.register_blueprint(auth.router, url_prefix='/api')

#below is for deployment, run yarn build each time code is updated for this to work
@app.route('/')
@app.route('/<path:path>')
def catch_all(path='index.html'):
    if os.path.isfile('public/' + path):
        return app.send_static_file(path)

    return abort(404)
