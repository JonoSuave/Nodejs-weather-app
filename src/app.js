const express = require('express')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000
const hbs = require('hbs')
const log = console.log
const path = require('path')

// Define paths for static assets and template rendering (i.e. Express config)
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Set handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        headline: `Yo Weather Homey`,
        name: 'Homey'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        headline: `I'm Robo Muffin and I finally have a brain`,
        name: 'Robo Muffin'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        headline: `Wait, are you asking for help from me?`,
        message: `What, do I look like a TA?`
    })
})

app.get('/weather', (req, res) => {
    debugger
    if(!req.query.address) return log(`Yo, where that address be?`)
    geocode(req.query.address, (err, {latitude, longitude, location} = {}) => {
        if(err) {
            log('error!!')
            return res.send({
                Error: err
            })
        }
        forecast(latitude, longitude, (error, forecastData = '') => {
            if(error) {
                return res.send({
                    Error: err
                })
            } else {
                // console.log(forecastData)
                res.send({
                    location,
                    forecastData
                })
            }
        })
    })
})

app.listen(port,() => {
    log(`The server is running on localhost:${port}`)
})
