import json
from flask import Blueprint, jsonify, render_template, request, abort, Response
from lr import loginradius

auth = Blueprint('auth', __name__, url_prefix='/')

# Routing to home page

@auth.route("/minimal", methods=['POST','GET'])
def minimal():
	return render_template('index.html')





