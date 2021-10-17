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
    url = "https://api.waqi.info/feed/"+ cityname +"/?token=demo ";
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
