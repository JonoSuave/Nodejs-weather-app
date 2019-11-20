const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoiam9ub3N1YXYiLCJhIjoiY2syeGxmMmo1MGhoeTNvcGVlNXpzZHpmdCJ9.SL1e8CeS3nkPtjPrrCKhiQ&limit=1'

    request({url: url, json: true}, (err, res, body) => {
        const {features} = body
        console.log(features)
        if(err) {
            return callback(`Unable to connect to location services! Is your WiFi connected?`)
        } else if(features == false || features.length === 0) {
            return callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined,{
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geocode