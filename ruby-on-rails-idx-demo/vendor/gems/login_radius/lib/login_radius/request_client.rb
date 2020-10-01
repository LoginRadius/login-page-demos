require 'net/http'
require 'openssl'
require 'base64'
require 'cgi'

module LoginRadius
  module RequestClient
    # LoginRadius Client Module: Methods relating to building and sending requests are defined here.

    API_V2_BASE_URL = 'https://api.loginradius.com/'
    API_V2_BASE_URL_CONFIG = 'https://config.lrcontent.com/'
    INIT_VECTOR = 'tu89geji340t89u2'
    KEY_SIZE = 256

    # Sends a POST API request.
    #
    # @param uri_endpoint [URI]              Target uri instance
    # @param params [Hash]              Parameters to send
    # @param body [Hash]                POST body
    #
    # @return [LoginRadius::Response]   LoginRadius response instance
    def post_request(uri_endpoint, params, body = {})
      uri_obj = build_new_uri_obj(uri_endpoint)

      headers = { 'Content-Type' => 'application/json' }
      if params.key?('access_token') # has_key
        if uri_endpoint.include? 'auth'
          access_token = params['access_token']
          params.delete('access_token')
          headers['Authorization'] = 'Bearer ' + access_token
        end
      end

      if params.key?('apiSecret') # has_key
        secret_key = params['apiSecret']
        params.delete('apiSecret')

        if ENV['API_REQUEST_SIGNING'] == 'false' || ENV['API_REQUEST_SIGNING'] == nil
          headers['X-LoginRadius-ApiSecret'] = secret_key
        else
          uri_obj = build_new_uri_obj(uri_endpoint)
          uri_obj.query = URI.encode_www_form(params)
          headers = create_hash_secret(uri_obj.request_uri, secret_key, headers, body)
        end
      end
      if params.key?('sott') # has_key
        headers['X-LoginRadius-Sott'] = params['sott']
        params.delete('sott')
      end

      uri_obj.query = URI.encode_www_form(params)
      http = Net::HTTP.new(uri_obj.host, uri_obj.port)
      http.use_ssl = true
      http.verify_mode = OpenSSL::SSL::VERIFY_NONE

      response = http.post(uri_obj.request_uri, body.to_json, headers)

      begin
        return LoginRadius::Response.new(response)
      rescue JSON::ParserError => e
        raise LoginRadius::Error.new("JSON parsing error has occurred. More info: #{e.message}")        
      end
    end

    def isNullOrWhiteSpace(params)
      return params.blank? ? true : false
    end

    def getValidationMessage(params)
      return params + " is a required parameter."
    end

    # Sends a GET API request.
    #
    # @param uri_endpoint [URI]      Target uri instance
    # @param params [Hash]           Parameters to send
    # @param body [Hash]             Request body
    #
    # @return [LoginRadius::Response]   LoginRadius response instance
    def get_request(uri_endpoint, params, body = {})      
      uri_obj = build_new_uri_obj(uri_endpoint)

      headers = {'Content-Type' => 'application/json'}
      if params.key?('access_token') # has_key
        if uri_endpoint.include? 'auth'
          access_token = params['access_token']
          params.delete('access_token')
          headers['Authorization'] = 'Bearer ' + access_token
        end
      end

      if params.key?('apiSecret') # has_key
        secret_key = params['apiSecret']
        params.delete('apiSecret')

        if ENV['API_REQUEST_SIGNING'] == 'false' || ENV['API_REQUEST_SIGNING'] == nil
          headers['X-LoginRadius-ApiSecret'] = secret_key
        else
          uri_obj = build_new_uri_obj(uri_endpoint)
          uri_obj.query = URI.encode_www_form(params)
          headers = create_hash_secret(uri_obj.request_uri, secret_key, headers, body)
        end
      end
      if params.key?('sott') # has_key
        headers['X-LoginRadius-Sott'] = params['sott']
        params.delete('sott')
      end

      uri_obj.query = URI.encode_www_form(params)
      http = Net::HTTP.new(uri_obj.host, uri_obj.port)
      http.use_ssl = true
      http.verify_mode = OpenSSL::SSL::VERIFY_NONE   
      response = http.get(uri_obj.request_uri, headers)

      begin
        return LoginRadius::Response.new(response)
      rescue JSON::ParserError => e
        raise LoginRadius::Error.new("JSON parsing error has occurred. More info: #{e.message}")
      end
    end

    # Sends a PUT API request.
    #
    # @param uri_endpoint [URI]         Target uri instance
    # @param params [Hash]              Parameters to send
    # @param body [Hash]                PUT body
    #
    # @return [LoginRadius::Response]   LoginRadius response instance
    def put_request(uri_endpoint, params, body = {})
      uri_obj = build_new_uri_obj(uri_endpoint)

      headers = { 'Content-Type' => 'application/json' }
      if params.key?('access_token') # has_key
        if uri_endpoint.include? 'auth'
          access_token = params['access_token']
          params.delete('access_token')
          headers['Authorization'] = 'Bearer ' + access_token
        end
      end

      if params.key?('apiSecret') # has_key
        secret_key = params['apiSecret']
        params.delete('apiSecret')

        if ENV['API_REQUEST_SIGNING'] == 'false' || ENV['API_REQUEST_SIGNING'] == nil
          headers['X-LoginRadius-ApiSecret'] = secret_key
        else
          uri_obj = build_new_uri_obj(uri_endpoint)
          uri_obj.query = URI.encode_www_form(params)

          headers = create_hash_secret(uri_obj.request_uri, secret_key, headers, body)
        end
      end
      if params.key?('sott') # has_key
        headers['X-LoginRadius-Sott'] = params['sott']
        params.delete('sott')
      end

      uri_obj.query = URI.encode_www_form(params)
      http = Net::HTTP.new(uri_obj.host, uri_obj.port)
      http.use_ssl = true
      http.verify_mode = OpenSSL::SSL::VERIFY_NONE
      response = http.put(uri_obj.request_uri, body.to_json, headers)
      begin
        return LoginRadius::Response.new(response)
      rescue JSON::ParserError => e
        raise LoginRadius::Error.new("JSON parsing error has occurred. More info: #{e.message}")
      end
    end

    # Sends a DELETE API request.
    #
    # @param uri_endpoint [URI]         Target uri instance
    # @param params [Hash]              Parameters to send
    # @param body [Hash]                POST body
    #
    # @return [LoginRadius::Response]   LoginRadius response instance
    def delete_request(uri_endpoint, params, body = {})
      uri_obj = build_new_uri_obj(uri_endpoint)

      headers = { 'Content-Type' => 'application/json' }
      if params.key?('access_token') # has_key
        if uri_endpoint.include? 'auth'
          access_token = params['access_token']
          params.delete('access_token')
          headers['Authorization'] = 'Bearer ' + access_token
        end
      end

      if params.key?('apiSecret') # has_key
        secret_key = params['apiSecret']
        params.delete('apiSecret')

        if ENV['API_REQUEST_SIGNING'] == 'false' || ENV['API_REQUEST_SIGNING'] == nil
          headers['X-LoginRadius-ApiSecret'] = secret_key
        else
          uri_obj = build_new_uri_obj(uri_endpoint)
          uri_obj.query = URI.encode_www_form(params)
          headers = create_hash_secret(uri_obj.request_uri, secret_key, headers, body)
        end
      end
      if params.key?('sott') # has_key
        headers['X-LoginRadius-Sott'] = params['sott']
        params.delete('sott')
      end

      uri_obj.query = URI.encode_www_form(params)
      http = Net::HTTP.new(uri_obj.host, uri_obj.port)
      http.use_ssl = true
      http.verify_mode = OpenSSL::SSL::VERIFY_NONE
      req = Net::HTTP::Delete.new(uri_obj.request_uri, headers)
      req.body = body.to_json
      response = http.request(req)

      begin
        return LoginRadius::Response.new(response)
      rescue JSON::ParserError => e
        raise LoginRadius::Error.new("JSON parsing error has occurred. More info: #{e.message}")
      end
    end

    # Builds a URI instance given type and resource
    #
    # @param resource [String]           Target resource
    #                                    custom_api_domain is set
    # @return [URI]                      uri instance
    def build_new_uri_obj(resource)
      if resource == 'ciam/appinfo'
        return URI.parse(API_V2_BASE_URL_CONFIG + resource)
      else
        if ENV['CUSTOM_API_DOMAIN'] == 'false' || ENV['CUSTOM_API_DOMAIN'] == nil
          return URI.parse(API_V2_BASE_URL + resource)
        else
          return URI.parse(ENV['CUSTOM_API_DOMAIN'] + resource)
        end
      end
    end

    # Create a has digest in header
    #
    # @param endpoint [String]           endpoint
    # @param secret_key [String]         secret key
    # @param headers [String]            headers
    # @param body [String]               body
    # @return [URI]                      uri instance
    #
    # @return [headers]                  header
    def create_hash_secret(endpoint, secret_key, headers, body = {})
      endpoint_uri = 'https://api.loginradius.com' + endpoint
      expiry_time = (Time.now.getutc() + (1*60*60)).strftime('%Y/%m/%d %H:%M:%S')

      encoded_uri = CGI.escape(CGI.unescape(endpoint_uri))

      if body.blank?
        string_to_hash = expiry_time + ':' + encoded_uri.downcase
      else
        string_to_hash = expiry_time + ':' + encoded_uri.downcase + ':' + body.to_json
      end

      mac = Base64.encode64(OpenSSL::HMAC.digest(OpenSSL::Digest.new('sha256'), secret_key, string_to_hash)).strip()
      headers['X-Request-Expires'] = expiry_time
      headers['digest'] = 'SHA-256='+mac
      return headers
    end

    # Local - Generate SOTT:
    # Generates a Secured One Time Token locally.
    #
    # @params validity_length [Integer]    Length of time the SOTT is valid for in minutes
    #
    # @returns sott [String]               LoginRadius Secured One Time Token
    def local_generate_sott(validity_length = 10)
      start_time = Time.now.getutc().strftime('%Y/%m/%d %H:%M:%S')
      end_time = (Time.now.getutc() + (validity_length*60)).strftime('%Y/%m/%d %H:%M:%S')

      plain_text = start_time + '#' + ENV['API_KEY'] + '#' + end_time
      iter = 10000
      salt = "\x00\x00\x00\x00\x00\x00\x00\x00"
      key_len = KEY_SIZE / 8
      cipher_key = OpenSSL::PKCS5.pbkdf2_hmac_sha1(ENV['API_SECRET'], salt, iter, key_len)

      cipher = OpenSSL::Cipher.new('aes-' + KEY_SIZE.to_s + '-cbc')
      cipher.encrypt
      cipher.key = cipher_key
      cipher.iv = INIT_VECTOR

      encrypted = cipher.update(plain_text) + cipher.final
      encrypted_b64 = Base64.strict_encode64(encrypted)

      hash = Digest::MD5.hexdigest(encrypted_b64)
      sott = encrypted_b64 + '*' + hash
      return sott
    end
  end
end
