const url = window.location.href;
const params = url.split("?")[1];
const domainName = url.substring(0, url.lastIndexOf("/"));

let vtype = getUrlParameter("vtype");
let paramsObj = {};

let access_token = getUrlParameter("token");

if(access_token !="" && access_token != null){
    setCookie("lr-session-token", access_token,"No Days");
    localStorage.setItem("lr-session-token", access_token); // First parameter will be the local storage name and 2nd parameter will be access_token
    }

    
if (params) {

        paramsObj = JSON.parse('{"' + decodeURI(params.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');  

//  if Url has emailverification vtype make an ajax request to email verification API   

    if (paramsObj.vtype === "emailverification") {
        $.ajax({
            type: "GET",
            url: "/email/verify?token=" + paramsObj.vtoken,
            dataType: "json",
            error: function(xhr){
                $(".messages").text(xhr.responseJSON);
                $(".messages").attr("class", "error-message").delay(2500).fadeOut(300);;
            }, success: function(res) {
                $(".messages").text("Email successfully verified.").delay(2500).fadeOut(300);;
                $(".messages").attr("class", "success-message");
            }
        })
    }
//  if Url has forgotpassword action_completed, display message   
    
    else if (paramsObj.action_completed === "forgotpassword") {

        $("#messages").text("Forgot Password Link Send Successfully, Check your Mailbox").attr("class", "success-message").delay(2500).fadeOut(300);
    }
    //  if Url has register action_completed, display message   

    else if (paramsObj.action_completed === "register") {

        $("#messages").text("Registered Successfully, Check your Mailbox").attr("class", "success-message").delay(2500).fadeOut(300);
    }

//  if Url has vytpe reset, redirect to the reset password page   

     else if(paramsObj.vtype === "reset"){
            let resettoken = paramsObj.vtoken;
            window.location.replace("resetpassword?vtype=reset&vtoken="+resettoken);
     }
}


// function to get the URL parameters


function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

// function to set the cookie

function setCookie(cname, cvalue, exdays) {
    var d = new Date(); 
    d.setTime(d.getTime() + (exdays* 24* 60* 60* 1000)); 
    var expires = "expires="+d.toUTCString(); 
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"; 
    }

// Checking if access token exist in the localStorage if so redirecting to the profile page

function checkSession() {
        var accesstoken = localStorage.getItem("lr-session-token");   
        if (accesstoken != "" && accesstoken != null) {
            window.location.href = domainName + "/profile";
            return;
        }
    }

checkSession();
