const express = require("express");
const https = require("https");
const app = express();

app.get("/", function(request,response){
    url = "https://api.waqi.info/feed/bangkok/?token=225d53a6a809699c600b2591a5d2eb0dc3492d42";
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
