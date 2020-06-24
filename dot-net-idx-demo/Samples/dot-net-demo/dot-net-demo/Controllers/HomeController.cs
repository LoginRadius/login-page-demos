using System;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using dot_net_demo.Models;


using LoginRadiusSDK.V2.Api.Authentication;
using LoginRadiusSDK.V2.Models.RequestModels;

using LoginRadiusSDK.V2.Common;
using LoginRadiusSDK.V2.Api.Account;

namespace dot_net_demo.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }


        public IActionResult EmailVerification()
        {
            return View();
        }

        public IActionResult ResetPassword()
        {
            return View();
        }

        public IActionResult Profile()
        {
            return View();
        }

 
        public IActionResult LRChangePassword([FromBody] ChangePasswordModel changePasswordModel, [FromQuery(Name = "auth")] String accessToken)
        {
            var apiresponse = new AuthenticationApi().ChangePassword(accessToken, changePasswordModel.newPassword, changePasswordModel.oldPassword);

            if (apiresponse.RestException != null)
            {
                return StatusCode(400, Json(apiresponse.RestException));
            }
            return Json(apiresponse.Response);
        }

 
  
 
        public IActionResult LRGetProfile([FromQuery(Name = "auth")] String accessToken)
        {
            var apiresponse = new AuthenticationApi().GetProfileByAccessToken(accessToken);
            if (apiresponse.RestException != null)
            {
                return StatusCode(400, Json(apiresponse.RestException));
            }
            return Json(apiresponse.Response);
        }
        public IActionResult LRUpdate([FromBody] AccountUserProfileUpdateModel updateModel, [FromQuery(Name = "uid")] String uid)
        {
            var apiresponse = new AccountApi().UpdateAccountByUid(updateModel, uid);
            if (apiresponse.RestException != null)
            {
                return StatusCode(400, Json(apiresponse.RestException));
            }
            return Json(apiresponse.Response);
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel
            {
                RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier
            });
        }
    }
}
