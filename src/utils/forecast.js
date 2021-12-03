const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ latitude +'&lon='+ longitude +'&exclude=?&appid=6d43808aa98e4e5055ddddc2d7355a52'
    request({url, json: true}, (error, { body }) => {
        if (error){
            callback('Unable to connect to weather service', undefined)
        }else if (body.error) {
            callback('Unable to find location', undefined)
        }else{
            callback( undefined, body.daily[0].weather[0].description + '. It is currently ' + body.current.temp + ' degrees out. The high today is ' + body.daily[0].temp.max + ' with a low of ' + body.daily[0].temp.min + '. The humidity is ' + body.current.humidity + '.' )
        }
    })
}

module.exports= forecast
