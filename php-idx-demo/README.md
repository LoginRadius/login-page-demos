
LoginRadius
==========

![Home Image](http://docs.lrcontent.com/resources/github/banner-1544x500.png)

-----------------------------------------------
LoginRadius PHP wrapper provides access to LoginRadius.

LoginRadius is a unified **Customer Identity Management** API platform that combines 30 major social platforms into a single simplified and maintenance-free API. With LoginRadius' API, websites and mobile apps can implement capture user profile data, enable social login, enable social sharing, add single sign-on and many more.

LoginRadius helps businesses boost user engagement on their web/mobile platform, manage online identities, utilize social media for marketing, capture accurate consumer data and get unique social insight into their customer base.

Please visit https://www.loginradius.com/docs/libraries/sdk-libraries/php-library for more information.

PHP Library
--------------

This document contains information and examples regarding the LoginRadius Php SDK implementation with LoginRadius IDX.

# LoginRadius

A demo PHP web application using the PHP SDK and LoginRadius IDX framework. The following features are included:

* Login with IDX
* Registration with IDX
* Email Verification
* Forgot Password
* Reset Password


## Configuration

1. Download the demo, src/LoginRadiusSDK from php sdk repo or clone the whole repo.
2. Upload these on server and wrapped in one directory.
3. Set your LoginRadius credentials on the client and server side:
	* Server side: `demo/ajax_handler/config.php`
	* Client side: `demo/js/options.js`
4. Demo will appear on `<Webserver URL>/<Project Name>/demo`

Note: To check out the Email Verification and Reset Password features, set the Email Verification URL and Forgot Password URL from the LoginRadius Admin Console to the Home Page of this demo.

## FAQs

1. How we are reading the users Access Token?

After successful login from LoginRadius IDX, the access token is returned as the query parameter to the callback URL, Access token is been read from the callback URL and stored in the browser.


2. How logout is working if we do logout on IDX page?

After Logout action is performed on the IDX successfuly, user is redirected to the callback URL. On the callback page, we are checking if the access token validity. If invalid, Access Token is been removed from the localStroage and Cookies. 


3. How we are managing the Access Token on local and IDX?

Local: Access token is stored as "lr-session-token" in both cookie and localStorage. In this demo, to fetch the user's profile, access token is read from the localStorage and an ajax call is made to the LoginRadius Php SDK for user's profile.

IDX: Access token is stored as "lr-session-token" in the cookie.