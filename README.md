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
2. run command node app.js
3. open localhost:8000
4. In your terminal you will see data that you have GET from the website

### How to extract particular value from JSON data

At this point once you get data from the web. It will present to you as a JSON format. Now, we're going to extract only some value out from that chunk of JSON data such as PM2.5, co, PM10, o3.

1. modify this method to look like this

```
app.get("/", function(req,res){
    url = "https://api.waqi.info/feed/shanghai/?token=demo";
    https.get(url, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
	    const city = weatherData.data.city.name
            const pm25 = weatherData.data.iaqi.pm25.v
            const pm10 = weatherData.iaqi.pm10.v
            const o3 = weatherData.iaqi.o3.v
            const co = weatherData.iaqi.co.v
        })
    })
})
```
