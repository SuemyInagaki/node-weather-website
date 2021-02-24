const request = require('request')

/*
Goal: Add new data to forecast

1. Update the forecast string to include new data
2. Commit your changes
3. Push your changes to github and deploy to heroku
4. Test your work in the live application!
*/


const forecast = function(place, callback){
    const url = 'http://api.weatherstack.com/current?access_key=3c2e705be847070c958a454f16bd2c92&query=' + encodeURIComponent(place)
    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('Unable to connect', undefined)
        }
        else if(body.error){
            callback('unable to find place', undefined)
        }
        else{
            const {location, current} = body
            const {country, lat: latitude, lon: longitude, localtime} = location
            const {temperature, precip, weather_descriptions: weather} = current
            callback(undefined, 
                    {
                        country,
                        latitude,
                        longitude,
                        temperature,
                        localtime,
                        weather,
                        precip
                    }
                    /**/
                )
        }
    })
}

module.exports = forecast