LoginRadius
==========

![Home Image](http://docs.lrcontent.com/resources/github/banner-1544x500.png)

-----------------------------------------------
LoginRadius ASP.Net wrapper provides access to LoginRadius.

LoginRadius is a unified **Customer Identity Management** API platform that combines 30 major social platforms into a single simplified and maintenance-free API. With LoginRadius' API, websites and mobile apps can implement capture user profile data, enable social login, enable social sharing, add single sign-on and many more.

LoginRadius helps businesses boost user engagement on their web/mobile platform, manage online identities, utilize social media for marketing, capture accurate consumer data and get unique social insight into their customer base.

Please visit https://www.loginradius.com/docs/libraries/sdk-libraries/asp-net-library/ for more information.

ASP.Net Library
--------------

This document contains information and examples regarding the LoginRadius ASP.Net SDK implementation with LoginRadius IDX.

### LoginRadius ASP.Net Demo

A demo with ASP.Net web application using the ASP.Net SDK and LoginRadius IDX framework. The following features are included:

* Login with IDX
* Registration with IDX
* Email Verification
* Forgot Password
* Reset Password

## Prerequisites

* .NET 4.0 or later / .NetStandard 1.3 or later

## Installation
This documentation presumes you have worked through the client-side implementation to setup your LoginRadius User Registration interfaces that will serve the initial registration and login process. Details on this can be found in the [getting started guide](/api/v2/getting-started/introduction).

**Note: **LoginRadius uses the industry standard TLS 1.2 protocol, designed to help protect the privacy of information communicated over the Internet. In order to use the LoginRadius .Net SDK, add the following code before instantiating your web service in your project's `Global.asax` file.

```
ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls12;
```

## Importing Required Libraries
- Download the User Registration .Net SDK from [Github](https://github.com/LoginRadius/dot-net-sdk)

- Copy LoginRadiusSDK.V2.dll and LoginRadiusSDK.V2.pdb files into the References directory of your ASP.NET project.

OR

- Run the following command in the NuGet Package Manager Console:

```
PM> Install-Package LoginRadiusSDK.NET
```

OR

- Open the solution using Visual Studio 2019.

- Build the project and note where the .nupkg file is located.

- Access the NuGet Package Manager Settings and import the directory where the .nupkg file is located.

- Access the "Manage NuGet Packages for Solutions..." tool change the source to the newly created source and select and install the LoginRadius SDK

Next, include the following namespaces in your project:


```
using LoginRadiusSDK.V2.Api;
using LoginRadiusSDK.V2.Models;
```
## Quickstart Guide

Getting LoginRadius  [API key and Secret Key](/api/v2/getting-started/get-api-key-and-secret)

Set your LoginRadius credentials on the client and Server side:

* Client side: `/dot-net-idx-demo/Samples/dot-net-demo/dot-net-demo/wwwroot/js/options.js`
* Server side: `/dot-net-idx-demo/Samples/dot-net-demo/appsettings.json`

**JSON**
```
"loginradius": {
    "apiKey": "__API_KEY__",
    "apiSecret": "__API_SECRET__",
    "appName" : "__LoginRadius_APP_NAME__",
	"ApiRequestSigning" : "false",
    "proxyAddress" : "__HTTP_PROXY_ADDRESS__",
    "proxyCredentials" : "__HTTP_PROXY_CREDENTIAL__",
    "connectionTimeout" : "__HTTP_CONNECTION_TIMEOUT__",
    "requestRetries" : "__HTTP_CONNECTION_RETRY__",
    "apiRegion": "_region_",
    "domainName" : "https://api.loginradius.com/"
  }

 ```

## FAQs

1. How we are reading the users Access Token?

After successful login from LoginRadius IDX, the access token is returned as the query parameter to the callback URL, Access token is been read from the callback URL and stored in the browser.


2. How logout is working if we do logout on IDX page?

After Logout action is performed on the IDX successfuly, user is redirected to the callback URL. On the callback page, we are checking if the access token validity. If invalid, Access Token is been removed from the localStroage and Cookies. 


3. How we are managing the Access Token on local and IDX?

Local: Access token is stored as "lr-session-token" in both cookie and localStorage. In this demo, to fetch the user's profile, access token is read from the localStorage and an ajax call is made to the LoginRadius ASP.Net SDK for user's profile.

IDX: Access token is stored as "lr-session-token" in the cookie.