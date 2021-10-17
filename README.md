# Weather Quality Application
Here is my first web application develop using ExpressJS. The main objective of this project is to fetch information about weather quality from https://aqicn.org/ and analyze it. Then, display the result to the user.

### How to fecth data from a particular endpoint

In this case we will fetch data from: https://api.waqi.info/feed/shanghai/?token=demo

NOTE: As you can see parameter token has value "demo", If you want actual result please register to get your own token key. Anyway "demo" token will do for now, if you just want to learn how to fecth data from web

1. add this code to app.js

```
const express = require("express");
const https = require("https");
const app = express();

app.get("/", function(request,response){
    url = "https://api.waqi.info/feed/shanghai/?token=demo";
    https.get(url, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            console.log(weatherData)
        })
    })
})

app.listen(8000, function(){
	console.log("Server started on port 8000");
});

```
