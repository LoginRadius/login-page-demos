module Api
  class LoginController < ApplicationController
  
    def reset_password_by_reset_token
      reset_token = params[:"resettoken"]
      new_password = params[:"password"]

      reset_password_model_with_lockout = {
        'resettoken': reset_token,
        'password': new_password,
        'welcomeEmailTemplate': '',
        'resetPasswordEmailTemplate': ''
      }
      response = AuthenticationApi.reset_password_by_reset_token(reset_password_model_with_lockout)

      render :status => response.code, :json => response.body
    end
  end
end
