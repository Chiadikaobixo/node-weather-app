 const path = require('path')
 const express = require('express')
 const hbs = require('hbs')
 const geocode = require('./utils/geocode')
 const forecast = require('./utils/forecast')

 const app = express()
 const port = process.env.PORT || 3000

 //Define path for Express config
 const publicPathDirectory = path.join(__dirname, '../public')
 const viewsPath = path.join(__dirname, '../templates/views')
 const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebars engine and views location
 app.set('view engine', 'hbs')
 app.set('views', viewsPath)
 hbs.registerPartials(partialsPath)

//Setup static directly to serve
 app.use(express.static(publicPathDirectory))

 app.get('', (req, res) => {
     res.render('index', {
         title: 'Weather',
         name: 'Chiadikaobi'
     })
 })

 app.get('/about', (req, res) => {
     res.render('about', {
         title: 'About Me',
         name: 'Chiadikaobi'
     })
 })

 app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Chiadikaobi'
    })
})

 app.get('/weather', (req, res) => {
     if(!req.query.address) {
         return res.send({
             error: 'You must provide an address.'
         })
     }
     
     geocode(req.query.address, (error, { latitude, longitude, location} ={}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
    
           console.log(req.query.address)
           res.send({
              forecast: forecastData,
              location,
              address: req.query.address
             })
         })
    })
    
})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        name: 'Chiadikaobi',
        errorMessage: 'Help article not found'
   })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Chiadikaobi',
        errorMessage: 'Page not found'
    })
})

 app.listen(port, () => {
     console.log('server is running on port' + port)
 })