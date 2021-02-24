const request = require('request')

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
            const {country, lat: latitude, lon: longitude} = location
            const {temperature, precip} = current
            callback(undefined, 
                    {
                        country,
                        latitude,
                        longitude,
                        temperature,
                        precip
                    }
                    /**/
                )
        }
    })
}

module.exports = forecast