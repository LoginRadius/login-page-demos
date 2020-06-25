module Api
  class RegistrationController < ApplicationController

    def registration_verify_email
      verification_token = params[:"verification_token"]

      fields = ''
      url = ''
      welcome_email_template = ''

      response = AuthenticationApi.verify_email(verification_token, fields, url, welcome_email_template)

      render :status => response.code, :json => response.body
    end
  end
end
