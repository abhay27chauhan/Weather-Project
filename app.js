const express = require("express");
const BodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(BodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
   res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res){
    var city = req.body.cityName;
    const appid = "bbbb15f2ec004c332341b62b76e274a7";
    const unit = req.body.unit;
    var unitType = "";

    switch(unit){
        case "metric":
            unitType = "Celsius";
            break;
        case "imperial":
            unitType = "Fahrenheit";
            break;
        default:
            unitType = "Kelvin";
        
    }
    
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid="+ appid +"&units="+unit;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            var weatherData = JSON.parse(data);
            var temp = weatherData.main.temp;
            var weatherDescription = weatherData.weather[0].description;
            var icon = weatherData.weather[0].icon;
            var imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png";
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The current temp in "+ city + " is " + temp + " " + unitType);
            res.write("<br/>")
            res.write("<img src="+ imageURL+">");
            res.send();
        })
    })

})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})

//  const url = "http://api.openweathermap.org/data/2.5/weather?q=London&appid=bbbb15f2ec004c332341b62b76e274a7";