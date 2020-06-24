from LoginRadius import LoginRadius as LR

# *** FILL IN CREDENTIALS ***
API_KEY = "<Enter LoginRadius API Key>"
API_SECRET = "<Enter LoginRadius API secret"
# ***************************

LR.API_KEY = API_KEY
LR.API_SECRET = API_SECRET
LR.LIBRARY = "requests"
LR.API_REQUEST_SIGNING = False
loginradius = LR()
