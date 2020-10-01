
LoginRadius
==========

![Home Image](http://docs.lrcontent.com/resources/github/banner-1544x500.png)

-----------------------------------------------
LoginRadius GoLang wrapper provides access to LoginRadius.

LoginRadius is a unified **Customer Identity Management** API platform that combines 30 major social platforms into a single simplified and maintenance-free API. With LoginRadius' API, websites and mobile apps can implement capture user profile data, enable social login, enable social sharing, add single sign-on and many more.

LoginRadius helps businesses boost user engagement on their web/mobile platform, manage online identities, utilize social media for marketing, capture accurate consumer data and get unique social insight into their customer base.

Please visit https://www.loginradius.com/docs/libraries/sdk-libraries/golang-library/ for more information.

GoLang Library
--------------

This document contains information and examples regarding the LoginRadius GoLang SDK implementation with LoginRadius IDX.

### LoginRadius GoLang Demo

A demo with GoLang web application using the GoLang SDK and LoginRadius IDX framework. The following features are included:

* Login with IDX
* Registration with IDX
* Email Verification
* Forgot Password
* Reset Password

## Usage

Take a peek:

Before making any API calls, the LoginRadius API client must be initialized with your Loginradius API key and API secret.

Sample code:

```
cfg := lr.Config{
    ApiKey:    <your API key>,
    ApiSecret: <your API secret>,
}

lrclient, err := lr.NewLoginradius(&cfg)

if err != nil {
    // handle error
}
```


Note: To check out the Email Verification and Reset Password features, set the Email Verification URL and Forgot Password URL from the LoginRadius Admin Console to ```http://localhost:3000/``` of this demo.


## FAQs

1. How we are reading the users Access Token?

After successful login from LoginRadius IDX, the access token is returned as the query parameter to the callback URL, Access token is been read from the callback URL and stored in the browser.


2. How logout is working if we do logout on IDX page?

After Logout action is performed on the IDX successfuly, user is redirected to the callback URL. On the callback page, we are checking if the access token validity. If invalid, Access Token is been removed from the localStroage and Cookies. 


3. How we are managing the Access Token on local and IDX?

Local: Access token is stored as "lr-session-token" in both cookie and localStorage. In this demo, to fetch the user's profile, access token is read from the localStorage and an ajax call is made to the LoginRadius GoLang SDK for user's profile.

IDX: Access token is stored as "lr-session-token" in the cookie.