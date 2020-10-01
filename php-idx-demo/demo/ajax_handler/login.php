<?php

require_once 'config.php';
use \LoginRadiusSDK\Utility\Functions;
use \LoginRadiusSDK\LoginRadiusException;
use \LoginRadiusSDK\Clients\IHttpClientInterface;
use \LoginRadiusSDK\Clients\DefaultHttpClient;

use \LoginRadiusSDK\CustomerRegistration\Authentication\AuthenticationAPI;



function resetPassword(array $request) {
    $token = isset($request['resettoken']) ? trim($request['resettoken']) : '';
    $password = isset($request['password']) ? trim($request['password']) : '';
    $response = array('status' => 'error', 'message' => 'An error occurred.');
    if (empty($token) || empty($password)) {
        $response['message'] = 'Password are required fields.';
    } else {
        $authenticationObj = new AuthenticationAPI();        
        $formData = ['resettoken' => $token, 'password' => $password, 'welcomeEmailTemplate' => '', 'resetPasswordEmailTemplate' => ''];
        $result = $authenticationObj->resetPasswordByResetToken($formData);
        $response = responseHandling($response, $result);  
        if ((isset($result->IsPosted) && $result->IsPosted)) {
            $response['message'] = "Password has been reset successfully.";
        }        
    }
    return json_encode($response);
}


function emailVerify(array $request) {
    $vtoken = isset($request['vtoken']) ? trim($request['vtoken']) : '';
    $response = array('status' => 'error', 'message' => 'An error occurred.');
    if (empty($vtoken)) {
        $response['message'] = 'Verification Token is a required field.';
    }
    else {
        $authenticationObj = new AuthenticationAPI();      
        $result = $authenticationObj->verifyEmail($vtoken);
        $response = responseHandling($response, $result);  
        if ((isset($result->IsPosted) && $result->IsPosted)) {
            $response['message'] = "Your email has been verified successfully.";                
        }     
       
    }
    return json_encode($response);
}


function responseHandling($response, $result) {
    if(isset($result->error_response)){     
        $response['message'] = $result->error_response->Description;     
    }else{   
        $response['status']  = 'success';
    }
    $response['data'] = $result;
    return $response;
}
