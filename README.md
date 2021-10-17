# Weather Quality Application
Here is my first web application develop using ExpressJS. The main objective of this project is to learn how to fetch information about weather quality from https://aqicn.org/. Then, display the result to the user. Moreover, user can select city that they want to see.

### How to fecth data from a particular endpoint

In this case we will fetch data from: https://api.waqi.info/feed/shanghai/?token=demo

NOTE: As you can see parameter token has value "demo", If you want actual result please register to get your own token key. Anyway "demo" token will do for now, if you just want to learn how to fecth data from web

NOTE: you can start with only empty app.js in your directory and run ```npm init``` and ```npm i express``` (already mentioned in part 1)
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
            const pm10 = weatherData.data.iaqi.pm10.v
            const o3 = weatherData.data.iaqi.o3.v
            const co = weatherData.data.iaqi.co.v
	    
	    // this part is just for printing
	    
            res.write("<p>City name : " + city + "<p>")
            res.write("<p>pm25 : " + pm25+ "<p>")
            res.write("<p>pm10 : " + pm10+ "<p>")
            res.write("<p>o3 : " + o3+ "<p>")
            res.write("<p>co : " + co+ "<p>")
            res.send()
        })
    })
})
```

### How to handle POST request from user

At this point API key "demo" will not work any more because we're going to let user select city that user want to see and query only that particular city. Demo key will not allow you to do that. It only allow you to query information from Shianghai, China. Therefore, you need to have your own API key, which you can get it from https://aqicn.org/data-platform/token/#/ but if you do not want to do that you can just see how application work from Youtube video above. 

1. create a form page where user can enter city name - index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WeatherQualityApp</title>
</head>
<body>
    <form action="/" method="post">
        <label for="cityname">Enter your city name: </label>
        <input id="cityname" type="text" name="city">
        <button type="submit">Enter</button>
    </form>
</body>
</html>
```
2. Open terminal and run ``` npm i body-parser ```
3. modify app.js to look like this

```
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req,res){
    const cityname = req.body.city
    url = "https://api.waqi.info/feed/"+ cityname +"/?token={YOUR_TOKEN:)} ";
    https.get(url, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const city = weatherData.data.city.name
            const pm25 = weatherData.data.iaqi.pm25.v
            const pm10 = weatherData.data.iaqi.pm10.v
            const o3 = weatherData.data.iaqi.o3.v
            const co = weatherData.data.iaqi.co.v
            res.write("<p>City name : " + city + "<p>")
            res.write("<p>pm25 : " + pm25+ "<p>")
            res.write("<p>pm10 : " + pm10+ "<p>")
            res.write("<p>o3 : " + o3+ "<p>")
            res.write("<p>co : " + co+ "<p>")
            res.send()
        })
    })
})

app.listen(8000, function(){
	console.log("Server started on port 8000");
});
```
4. Style it as you like

At this point you already know how to fetching data and process it from the particular end-point. Next, you will learn how to writing some unittest using JEST
see more, [JS-series-JavaScript unit testing with JEST](https://github.com/Jomsaruj/JS-series3-JEST)
