<?php

require_once 'config.php';

use \LoginRadiusSDK\Utility\Functions;
use \LoginRadiusSDK\LoginRadiusException;
use \LoginRadiusSDK\Clients\IHttpClientInterface;
use \LoginRadiusSDK\Clients\DefaultHttpClient;

use \LoginRadiusSDK\CustomerRegistration\Authentication\AuthenticationAPI;

function getProfileByToken(array $request) {
    $token = isset($request['token']) ? trim($request['token']) : '';
    $response = array('status' => 'error', 'message' => 'An error occurred.');
    if (empty($token)) {
        $response['message'] = 'Access Token is a required field.';
    }
    else {
        $authObj = new AuthenticationAPI();
        $fields = '';

        $result = $authObj->getProfileByAccessToken($token, $fields);
        $response = responseHandling($response, $result);
        if ((isset($result->Uid) && $result->Uid != '')) {
            $response['message'] = "Profile successfully retrieved.";
        }
    }
    return json_encode($response);
}

function changePassword(array $request) {
  $accessToken = isset($request['token']) ? trim($request['token']) : '';
  $oldPassword = isset($request['oldpassword']) ? trim($request['oldpassword']) : '';
  $newPassword = isset($request['newpassword']) ? trim($request['newpassword']) : '';
  $response = array('status' => 'error', 'message' => 'An error occurred.');
  if (empty($oldPassword)) {
    $response['message'] = 'Old password is a required field.';
  }
  elseif (empty($newPassword)) {
    $response['message'] = 'New password is a required field.';
  }
  else {
    $authObj = new AuthenticationAPI();
    $result = $authObj->changePassword($accessToken, $newPassword, $oldPassword);
    $response = responseHandling($response, $result);
    if (isset($result->IsPosted) && $result->IsPosted) {
      $response['message'] = "Password has been changed successfully.";
      $response['status'] = 'success';
    }
  }
  return json_encode($response);
}

function updateAccount(array $request) {
  $firstname = isset($request['firstname']) ? trim($request['firstname']) : '';
  $lastname = isset($request['lastname']) ? trim($request['lastname']) : '';
  $about = isset($request['about']) ? trim($request['about']) : '';
  $response = array('status' => 'error', 'message' => 'An error occurred.');

  $authenticationObj = new AuthenticationAPI();
  $userProfileUpdateModel = array('FirstName' => $firstname, 'LastName' => $lastname, 'About' => $about);
  $accessToken = $request['token'];
  $emailTemplate = '';
  $fields = '';
  $nullSupport = '';
  $smsTemplate = '';
  $verificationUrl = '';

  $result = $authenticationObj->updateProfileByAccessToken($accessToken, $userProfileUpdateModel, $emailTemplate, $fields, $nullSupport, $smsTemplate, $verificationUrl);
  $response = responseHandling($response, $result);
  if (isset($result->IsPosted) && $result->IsPosted) {
      $response['message'] = "Profile has been updated successfully.";
      $response['status'] = 'success';
  }

  return json_encode($response);
}

function responseHandling($response, $result) {
  if(isset($result->error_response)){
    $response['message'] = $result->error_response->Description;
  } else{
    $response['status']  = 'success';
  }
  $response['data'] = $result;
  return $response;
}
