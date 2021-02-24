const request = require('request')


const geocode = function(location, callback) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1Ijoic3VlbXkiLCJhIjoiY2tsMmJpeTNpMGRzajJwbGNqdHdhZHkzaCJ9.aBJfdEeaQxYW_mzp8tG9QQ&limit=1'
    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('Unabele to connect', undefined)
        }
        else if(body.error || !body.features[0]){
            callback('Unable to find location', undefined)
        }
        else{
            
            const {place_name: place, center} = body.features[0]

            callback(undefined,
                {
                    place,
                    latitude: center[1],
                    longitude: center[0]
                })
        }
    })
}

module.exports = geocode
