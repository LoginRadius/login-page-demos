from user import user
from auth import auth
from flask import Flask, redirect

app = Flask(__name__)
app.register_blueprint(auth)
app.register_blueprint(user)

# redirecting the minimal path

@app.route("/")
def main():
    return redirect("/minimal")

if __name__ == "__main__":
    app.run()