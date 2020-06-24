var url = window.location.href;
var params = url.split("?")[1];
var domainName = url.substring(0, url.lastIndexOf("/"));
$(function() {
	checkSession();
	Login_html();
	Register_html();
	Forgot_html();
});



var access_token = getParameterByName("token");

if( access_token !="" && access_token != null){
		setCookie("lr-session-token", access_token,"No Days")
		setCookie("LRTokenKey", access_token,"No Days")
		localStorage.setItem("lr-session-token", access_token); 
		localStorage.setItem("LRTokenKey", access_token);// First parameter will be the local storage name and 2nd parameter will be access_token
}


function checkSession() {
    var accesstoken = localStorage.getItem("LRTokenKey");   
    if (accesstoken != "" && accesstoken != null) {
        window.location.replace("/profile");
        return;
    }
}

function Login_html(){
    let loginUrl = 'https://'+commonOptions.appName+'.hub.loginradius.com/auth.aspx?action=login&return_url='+domainName+'';

    $("#login").prepend("<a href =" + loginUrl +"> <div class='index-button' >Login</div> </a>");
}

function Register_html(){
    let loginUrl = 'https://'+commonOptions.appName+'.hub.loginradius.com/auth.aspx?action=register&return_url='+domainName+'';

    $("#register").prepend("<a href =" + loginUrl +"> <div class='index-button' >Register</div> </a>");
}
function Forgot_html(){
    let loginUrl = 'https://'+commonOptions.appName+'.hub.loginradius.com/auth.aspx?action=forgotpassword&return_url='+domainName+'';

    $("#forgotpassword").prepend("<a href =" + loginUrl +"> <div class='index-button' >Forgot Password</div> </a>");
}




function getParameterByName(name) { 
    name = name.replace(/[[]/, '\[').replace(/[]]/, '\]'); 
    var regex = new RegExp('[\?&]' + name + '=([^&#]*)'); 
    var results = regex.exec(location.search); return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
     } 


function setCookie(cname, cvalue, exdays) {
	
    var d = new Date(); 
    d.setTime(d.getTime() + (exdays* 24* 60* 60* 1000)); 
    var expires = "expires="+d.toUTCString(); 
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"; 
    
}