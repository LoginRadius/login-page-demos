﻿using LoginRadiusSDK.V2.Common;
using LoginRadiusSDK.V2.Util.Serialization;
using Newtonsoft.Json;
using System.Net;

namespace LoginRadiusSDK.V2.Exception
{
    /// <summary>
    /// The LoginRadiusException class is used to handle exception while loginRadius API is executing.
    /// </summary>
    public class LoginRadiusException : System.Exception
    {
        /// <summary>
        /// Gets the response payload for non-200 response
        /// </summary>
        public string Response { get; set; }

        private ApiExceptionResponse _errorResponse;

        public ApiExceptionResponse ErrorResponse
        {
            get
            {
                if (_errorResponse == null)
                {
                    _errorResponse = JsonFormatter.ConvertFromJson<ApiExceptionResponse>(Response);
                    return _errorResponse;
                }
                return _errorResponse;
            }
        }

        /// <summary>
        /// LoginRadiusException
        /// </summary>
        public LoginRadiusException(){}

        /// <summary>
        /// LoginRadiusException
        /// </summary>
        /// <param name="message"></param>
        public LoginRadiusException(string message)
            : base(message)
        {
        }

        /// <summary>
        /// LoginRadiusException
        /// </summary>
        /// <param name="message"></param>
        /// <param name="innerException"></param>
        public LoginRadiusException(string message, System.Exception innerException)
            : base(message, innerException)
        {
            string errorMessage = string.IsNullOrEmpty(ExceptionMessagePrefix)
                ? message
                : $"{ExceptionMessagePrefix}: {message}";
            if (innerException == null)
            {
                Response = errorMessage;
            }
            else
            {
                Response = errorMessage + innerException;
            }
        }

        protected virtual string ExceptionMessagePrefix
        {
            get { return string.Empty; }
        }

        /// <summary>
        ///  LoginRadiusException
        /// </summary>
        /// <param name="message"></param>
        /// <param name="innerException"></param>
        /// <param name="response"></param>
        /// <param name="statusCode"></param>
        public LoginRadiusException(string message, System.Exception innerException, string response, HttpStatusCode statusCode)
            : base(message, innerException)
        {

            if (!string.IsNullOrEmpty(response) && JsonFormatter.ValidateJSON(response))
            {
                Response = response;
            }
            else
            {
                ApiExceptionResponse apiExceptionResponse = new ApiExceptionResponse
                {
                    Message = message,
                    ErrorCode = (int?)statusCode,
                    Description = message,
                    IsProviderError = false,
                    ProviderErrorResponse = null
                };

                Response = JsonConvert.SerializeObject(apiExceptionResponse);

            }


        }
    }
}
