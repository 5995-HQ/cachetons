from flask import Flask, render_template, Response
from db import db_session
import os

app = Flask(__name__, template_folder=os.path.relpath("./static"), static_folder=os.path.relpath("./static"))

app.config.update(
    USER_ATTRIBUTES=["prsId", "lastName", "allGroups1", "nickName"],
    ANONYMOUS_USER=os.environ.get("ANONYMOUS_USER", dict(prsId=1234, lastName="Appleseed", nickName="Johnny")),
)


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()
