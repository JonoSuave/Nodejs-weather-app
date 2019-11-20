const request = require('request')
const log = console.log

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/b9ffd772902cee4b09b9e7fbbddb9f31/' + latitude + ',' + longitude + ''
    
    request({url, json: true }, (err, res, body) => {
        log(body)
        const {code, daily, currently} = body
        if(err) {
            callback(`Your Wifi connected? Couldn't connect to service`, undefined)
        } else if(code == 400) {
            callback('Yo, bad search man. Check your coordinates', undefined)
        } else {
            const currTime = new Date(daily.data[0].time *1000)
            log(currTime)
            callback(undefined, {
                currTemp: currently.temperature,
                rainPotential: currently.precipProbability.toFixed(2)
            })
        }
    })
}

module.exports = forecast