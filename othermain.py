from app import app, appleconnect, render_template, Response
from api.routes import apiRoutes

app.register_blueprint(apiRoutes, url_prefix="/api")


@app.route("/__<path:_>")
def health(_):
    return Response("Success", status=200)


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
@appleconnect.auth(param="appleconnect_user")
def catch_all(path, appleconnect_user):
    return render_template("index.html")
