
LoginRadius
==========

![Home Image](http://docs.lrcontent.com/resources/github/banner-1544x500.png)

-----------------------------------------------
LoginRadius Ruby wrapper provides access to LoginRadius.

LoginRadius is a unified **Customer Identity Management** API platform that combines 30 major social platforms into a single simplified and maintenance-free API. With LoginRadius' API, websites and mobile apps can implement capture user profile data, enable social login, enable social sharing, add single sign-on and many more.

LoginRadius helps businesses boost user engagement on their web/mobile platform, manage online identities, utilize social media for marketing, capture accurate consumer data and get unique social insight into their customer base.

Please visit https://www.loginradius.com/docs/libraries/sdk-libraries/python-library/ for more information.

Python Library
--------------

This document contains information and examples regarding the LoginRadius Python SDK implementation with LoginRadius IDX.

# LoginRadius

A demo with Python web application using the Python SDK and LoginRadius IDX framework. The following features are included:

* Login with IDX
* Registration with IDX
* Email Verification
* Forgot Password
* Reset Password


## Build & Run ##

1.Have Flask, requests, pbkdf2, cryptography installed:

```pip install flask``` <br>
```pip install requests``` <br>
```pip install pbkdf2 ``` <br>
```pip install cryptography ``` <br>

2.Fill in credentials in ```lr.py``` and ```static/js/options.js```

3.Navigate to demo directory and run: ```python app.py```

4.Demo will appear on ```http://localhost:5000```

Note: To check out the Email Verification and Reset Password features, set the Email Verification URL and Forgot Password URL from the LoginRadius Admin Console to ```http://localhost:5000/minimal``` of this demo.