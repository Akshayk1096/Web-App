const express = require('express')
const path = require('path')
const hbs=require('hbs')
//const request = require('request')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app=express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//setup handler engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather Site',
        name: 'Akshay'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        pageHeader: 'About Us',
        name: 'Akshay',
        title: 'About'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Help',
        name:'Akshay',
        helpMsg: 'For further support/help, contact us.'
    })
})



app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Must pass location'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude, address}={})=>{
        if(error){
            return res.send({ error })
        } 
        
        forecast(latitude, longitude, (error,{temperature, feelslike, weather_descriptions}={})=>{
            if(error){
                return res.send({ error })
            }

            return res.send({
                address,
                weather_descriptions,
                temperature,
                feelslike
            })
                //console.log(weather_descriptions+'. Temprature now: '+temperature+ ' degrees. Feels like temp:'+feelslike+' degrees')
        })
    
    })
    
})

app.get('/product', (req,res) => {
    if(!req.query.games){
        return res.send({
            error: 'You must enter game name'
          })
    }

    res.send({
      product: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 'help article not found'
    })
})

app.get('*', (req,res)=>{
    res.render('404', {
        title: 'page not found',
        name: 'Akshay'
    })
})

app.listen(3000, () => {
    console.log('Server running on 3000')
})