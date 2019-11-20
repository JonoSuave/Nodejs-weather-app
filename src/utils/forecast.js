const request = require('request')
const log = console.log

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/b9ffd772902cee4b09b9e7fbbddb9f31/' + latitude + ',' + longitude + '?units=auto'
    
    request({url, json: true }, (err, res, body) => {
        log(body)
        const {code, daily, currently, flags} = body
        const {temperature, precipProbability, summary} = currently
        if(err) {
            callback(`Your Wifi connected? Couldn't connect to service`, undefined)
        } else if(code == 400) {
            callback('Yo, bad search man. Check your coordinates', undefined)
        } else {
            const currTime = new Date(daily.data[0].time *1000)
            log(currTime)
            callback(undefined, {
                currTemp: temperature,
                rainPotential: precipProbability.toFixed(2),
                summary,
                temperatureUnit: flags.units
            })
        }
    })
}

module.exports = forecast