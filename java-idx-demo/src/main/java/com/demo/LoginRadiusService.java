package com.demo;



import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.loginradius.sdk.api.account.AccountApi;
import com.loginradius.sdk.api.authentication.AuthenticationApi;
import com.loginradius.sdk.models.requestmodels.AccountUserProfileUpdateModel;
import com.loginradius.sdk.models.responsemodels.otherobjects.PostResponse;
import com.loginradius.sdk.models.responsemodels.userprofile.Identity;
import com.loginradius.sdk.util.AsyncHandler;
import com.loginradius.sdk.util.ErrorResponse;
import com.loginradius.sdk.util.LoginRadiusSDK;


/**
 * Created by LoginRadius Development Team on 09/23/2018
 */
@Service
public class LoginRadiusService {

	@Value("${app.apikey}")
	private String apikey;
	@Value("${app.apisecret}")
	private String apisecret;
	@Value("${server.port}")
	private String server_port;
	Gson gson = new Gson();
	private LoginRadiusSDK.Initialize init = new LoginRadiusSDK.Initialize();

	private String emailverification = "";
	private String resetpassword = "";
	private String resp = "";

	@PostConstruct
	public void init() {
		init.setApiKey(apikey);
		init.setApiSecret(apisecret);

		emailverification = "http://localhost:" + server_port + "/emailverification";
		resetpassword = "http://localhost:" + server_port + "/resetpassword";
	}



	public String getUserProfile(HttpServletRequest request) {
		AuthenticationApi auth = new AuthenticationApi();
		auth.getProfileByAccessToken(request.getParameter("token"), null, new AsyncHandler<Identity>() {
			@Override
			public void onSuccess(Identity arg0) {
				// TODO Auto-generated method stub
				resp = gson.toJson(arg0);
			}

			@Override
			public void onFailure(ErrorResponse error) {
				// TODO Auto-generated method stub
				resp = error.getDescription();
			}

		});
		return resp;
	}

	public String changePassword(HttpServletRequest request) {
		AuthenticationApi auth = new AuthenticationApi();
		auth.changePassword(request.getParameter("token"), request.getParameter("newpassword"),
				request.getParameter("oldpassword"), new AsyncHandler<PostResponse>() {

					@Override
					public void onFailure(ErrorResponse arg0) {
						// TODO Auto-generated method stub
						resp = arg0.getDescription();
					}

					@Override
					public void onSuccess(PostResponse arg0) {
						// TODO Auto-generated method stub
						resp = gson.toJson(arg0);
					}
				});
		return resp;
	}

	

	

	
	

	public String logout(HttpServletRequest request) {
		AuthenticationApi auth = new AuthenticationApi();
		auth.authInValidateAccessToken(request.getParameter("token"), null, new AsyncHandler<PostResponse>() {

			@Override
			public void onFailure(ErrorResponse arg0) {
				// TODO Auto-generated method stub
				resp = arg0.getDescription();
			}

			@Override
			public void onSuccess(PostResponse arg0) {
				// TODO Auto-generated method stub
				resp = gson.toJson(arg0);
			}
		});
		return resp;
	}
	public String accountUpdate(HttpServletRequest request) {
		AccountApi api = new AccountApi();
		AccountUserProfileUpdateModel userProfileUpdateModel = new AccountUserProfileUpdateModel();
		userProfileUpdateModel.setFirstName(request.getParameter("firstname"));
		userProfileUpdateModel.setLastName(request.getParameter("lastname"));
		userProfileUpdateModel.setAbout(request.getParameter("about"));
		api.updateAccountByUid(userProfileUpdateModel, request.getParameter("uid"), null, new AsyncHandler<Identity>() {

			@Override
			public void onFailure(ErrorResponse arg0) {
				// TODO Auto-generated method stub
				resp = arg0.getDescription();
			}

			@Override
			public void onSuccess(Identity arg0) {
				// TODO Auto-generated method stub
				resp = gson.toJson(arg0);
			}
		});
		return resp;
	}



}