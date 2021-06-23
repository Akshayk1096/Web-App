const request = require('request')

const forecast = (lat, long, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=c909aabe1941499c8e405785ce9e8317&query='+lat+','+long+'&units=m'

    request({url, json:true}, (error,response) =>{
        if(error){
            callback('unable to reach API', undefined)
        }
        else if(response.body.error){
            callback('unable to find lat-long, Please enter another lat-long', undefined)
        }
        else{
            callback(undefined, {
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike,
                weather_descriptions: response.body.current.weather_descriptions[0],
            })
        }
    })
}

module.exports = forecast