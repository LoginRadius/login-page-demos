var commonOptions = {};
commonOptions.apiKey = "<LoginRadius API key>";
commonOptions.appName = "<LoginRadius App Name>";
const url = window.location.href;
const domainName = url.substring(0, url.lastIndexOf("/"));
const params = url.split("?")[1];
const serverUrl = "http://localhost:3000/api"