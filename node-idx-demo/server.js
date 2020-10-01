/*  Config variable  */
var config = {
  apiDomain: 'api.loginradius.com',
  apiKey: '<LoginRadius API key>',
  apiSecret: '<LoginRadius API secret>',
  siteName: '<LoginRadius App name>',
  apiRequestSigning: false,
};

// Module dependencies.
var express = require('express');
var lrObj = require('loginradius-sdk')(config);
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var PORT = 3000;
app.use('/demo', express.static(path.join(__dirname, '/demo')));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/ajax_handler/profile', function (req, res) {
  var action = req.body.action ? req.body.action : '';
  var output = {};
  output.status = 'error';
  output.message = 'an error occoured';
  if (action === 'updateAccount') {
    var accessToken = req.body.token ? req.body.token : '';
    var firstname = req.body.firstname ? req.body.firstname : '';
    var lastname = req.body.lastname ? req.body.lastname : '';
    var about = req.body.about ? req.body.about : '';
    if (accessToken === '') {
      output.message = 'Token is required';
    } else {
      var userProfileUpdateModel = {};
      userProfileUpdateModel.FirstName = firstname;
      userProfileUpdateModel.LastName = lastname;
      userProfileUpdateModel.About = about;
      var emailTemplate = '';
      var fields = '';
      var nullSupport = true;
      var verificationUrl = 'http://localhost:3000/demo';
      var smsTemplate = '';

      lrObj.authenticationApi.updateProfileByAccessToken(accessToken, userProfileUpdateModel, emailTemplate, fields, nullSupport, smsTemplate, verificationUrl).then(function (response) {
        if (response.IsPosted) {
          output.message = 'Profile has been updated successfully.';
          output.status = 'success';
        } else {
          output.message = 'Account not updated';
        }
        res.send(output);
      }).catch(function (error) {
        output.message = error.Description;
        res.send(output);
      });
    }
  } else if (action === 'getProfileByUid') {
    var uid = req.body.uid ? req.body.uid : '';
    if (uid === '') {
      output.message = 'uid is required';
    } else {
      var fields = '*';
      lrObj.accountApi.getAccountProfileByUid(uid, fields).then(function (response) {
        if (response.Uid) {
          output.data = response;
          output.message = 'fetched profile';
          output.status = 'success';
        } else {
          output.message = 'profile not fetched';
        }
        res.send(output);
      }).catch(function (error) {
        output.message = error.Description;
        res.send(output);
      });
    }
  } else if (action === 'changePassword') {
    var accessToken = req.body.token ? req.body.token : '';
    var oldPassword = req.body.oldpassword ? req.body.oldpassword : '';
    var newPassword = req.body.newpassword ? req.body.newpassword : '';
    if (accessToken === '') {
      output.message = 'Token is required';
    } else if (oldPassword === '') {
      output.message = 'old passwpord is required';
    } else if (newPassword === '') {
      output.message = 'new passwpord is required';
    } else {
      lrObj.authenticationApi.changePassword(accessToken, newPassword, oldPassword).then(function (response) {
        if (response.IsPosted) {
          output.message = 'Password has been changed successfully.';
          output.status = 'success';
        } else {
          output.message = 'Password has not Updated.';
        }
        res.send(output);
      }).catch(function (error) {
        output.message = error.Description;
        res.send(output);
      });
    }
  } else if (action === 'setPassword') {
    var uid = req.body.uid ? req.body.uid : '';
    var newpassword = req.body.newpassword ? req.body.newpassword : '';
    if (uid === '') {
      output.message = 'Uid is required';
    } else if (newpassword === '') {
      output.message = 'new passwpord is required';
    } else {
      lrObj.accountApi.setAccountPasswordByUid(newpassword, uid).then(function (response) {
        if (response.PasswordHash) {
          output.message = 'Password has been set successfully.';
          output.status = 'success';
        } else {
          output.message = 'Password not Created.';
        }
        res.send(output);
      }).catch(function (error) {
        output.message = error.Description;
        res.send(output);
      });
    }
  }
});

app.post('/ajax_handler/login', function (req, res) {
  var action = req.body.action ? req.body.action : '';
  var output = {};
  output.status = 'error';
  output.message = 'an error occoured';
  if (action === 'getProfile') {
    var token = req.body.token ? req.body.token : '';
    if (token === '') {
      output.message = 'Token is required';
    } else {
      var fields = '';
      lrObj.authenticationApi.getProfileByAccessToken(token, fields).then(function (response) {
        if ((response.Uid && response.Uid != '')) {
          output.data = response;
          output.message = 'Profile fetched';
          output.status = 'success';
        } else {
          output.message = 'Account does not exist.';
        }
        res.send(output);
      }).catch(function (error) {
        output.message = error.Description;
        res.send(output);
      });
    }
  } else if (action === 'resetPassword') {
    var token = req.body.resettoken ? req.body.resettoken : '';
    var password = req.body.password ? req.body.password : '';
    if (token === '') {
      output.message = 'Token is required';
    } else if (password === '') {
      output.message = 'Password is required';
    } else {
      var formData = {
        'resettoken': req.body.resettoken,
        'password': req.body.password,
        'welcomeEmailTemplate': '',
        'resetPasswordEmailTemplate': ''
      };
      lrObj.authenticationApi.resetPasswordByResetToken(formData).then(function (response) {
        if ((response.IsPosted)) {
          output.message = 'Password has been reset successfully.';
          output.status = 'success';
        }
        res.send(output);
      }).catch(function (error) {
        output.message = error.Description;
        res.send(output);
      });
    }
  } else if (action === 'emailVerify') {
    var verificationToken = req.body.vtoken ? req.body.vtoken : '';
    if (verificationToken === '') {
      output.message = 'Verification token is required';
    } else {
      var fields = '';
      var url = '';
      var welcomeEmailTemplate = '';
      lrObj.authenticationApi.verifyEmail(verificationToken, fields, url, welcomeEmailTemplate).then(function (response) {
        if ((response.IsPosted)) {
          output.message = 'Your email has been verified successfully.';
          output.status = 'success';
        }
        res.send(output);
      }).catch(function (error) {
        output.message = error.Description;
        res.send(output);
      });
    }
  }
});


app.listen(PORT, () => console.log('Demo app can be accessed at localhost:' + PORT + '/demo'));
