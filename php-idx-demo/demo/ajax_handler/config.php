<?php
define('LR_API_KEY', 'LoginRadius API Key');
define('LR_API_SECRET', 'LoginRadius API Secret');  // Pass API Secret Key
define('API_REQUEST_SIGNING', ''); // Pass true/false for enable/disable
define('AUTH_FLOW', '');   // Pass optional/disabled, if email verification flow optional or disabled, no need to mention if required flow

//If you have Custom API Domain then define 'API_DOMAIN' then replaced it with your custom API domain,
//otherwise no need to define these option in configuration.
// define('API_DOMAIN', 'https://api.loginradius.com');

require_once "../../src/LoginRadiusSDK/Utility/Functions.php";
require_once "../../src/LoginRadiusSDK/LoginRadiusException.php";
require_once "../../src/LoginRadiusSDK/Clients/IHttpClientInterface.php";
require_once "../../src/LoginRadiusSDK/Clients/DefaultHttpClient.php";


require_once "../../src/LoginRadiusSDK/CustomerRegistration/Authentication/AuthenticationAPI.php";



