const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs')

app.get("/", function(req,res){
    res.sendFile(__dirname + "/home.html")
})

app.post("/", function(req,res){
    const cityname = req.body.city
    const token = '225d53a6a809699c600b2591a5d2eb0dc3492d42'
    url = "https://api.waqi.info/feed/"+ cityname +"/?token="+ token;
    https.get(url, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const city = weatherData.data.city.name
            const pm25 = weatherData.data.iaqi.pm25.v
            const pm10 = weatherData.data.iaqi.pm10.v
            const co = weatherData.data.iaqi.co.v
            const date = new Date();
            const time = date.getDate() +  "-" + date.getMonth() + "-"+ date.getFullYear()+ " " + date.getHours() +":"+ date.getMinutes() +":"+ date.getSeconds();
            res.render('result', {cityname: city, pm25: pm25, CO: co, pm10: pm10, time: time})
            // res.write("<p>City name : " + city + "<p>")
            // res.write("<p>pm25 : " + pm25+ "<p>")
            // res.write("<p>pm10 : " + pm10+ "<p>")
            // res.write("<p>o3 : " + o3+ "<p>")
            // res.write("<p>co : " + co+ "<p>")
            // res.send()
        })
    })
    
})

app.listen(process.env.PORT || 8000, function(){
	console.log("Server started on port 8000");
});
