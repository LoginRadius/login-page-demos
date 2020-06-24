from flask import Blueprint, jsonify, render_template, request, abort, Response, redirect
from lr import loginradius

user = Blueprint('user', __name__, url_prefix='/')

# Routing the user to the profile page

@user.route("/profile", methods=['GET', 'POST'])
def profile():
	return render_template('profile.html')

# Fetching the User profile from the python sdk with access token

@user.route("/user")
def get_user():
	res = loginradius.authentication.get_profile_by_access_token(request.args['token'])
	if 'ErrorCode' in res:
		return abort(Response(res['Description'], 400))
	else:
		return jsonify(res)

@user.route("/password/change", methods=['PUT'])
def change_password():
	res = loginradius.authentication.change_password(request.form['token'], request.form['newpassword'], request.form['oldpassword'])
	if 'ErrorCode' in res:
		return abort(Response(res['Description'], 400))
	else:
		return jsonify(res)

@user.route("/account", methods=['PUT'])
def update_account():
	payload = {
		'FirstName': request.form['firstname'],
		'LastName': request.form['lastname'],
		'About': request.form['about']
	}
	res = loginradius.account.update_account_by_uid(payload, request.form['uid'])
	if 'ErrorCode' in res:
		return abort(Response(res['Description'], 400))
	else:
		return jsonify(res)



