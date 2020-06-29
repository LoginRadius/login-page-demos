//-----------------------------------------------------------------------
// <copyright file="ModelClass" company="LoginRadius">
//     Created by LoginRadius Development Team
//     Copyright 2019 LoginRadius Inc. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

using Newtonsoft.Json;
namespace LoginRadiusSDK.V2.Models.RequestModels

{

    /// <summary>
    ///	Model Class containing Definition of payload for OneTouchLogin By EmailModel API
    /// </summary>
    public class OneTouchLoginByEmailModel:ReCaptchaBodyModel
    {
		/// <summary>
		///	Unique ID generated by client
		/// </summary>
		[JsonProperty(PropertyName = "clientguid")]
        public  string Clientguid {get;set;}

		/// <summary>
		///	user's email
		/// </summary>
		[JsonProperty(PropertyName = "Email")]
        public  string Email {get;set;}

		/// <summary>
		///	Name of the customer
		/// </summary>
		[JsonProperty(PropertyName = "Name")]
        public  string Name {get;set;}

    }
}