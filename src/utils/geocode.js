const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address)+ '.json?access_token=pk.eyJ1IjoiYWtzaGF5azEwOTYiLCJhIjoiY2twdGZvM214MHJ0NzMxbW51bGJlY3kyZyJ9.ZZAM2JCUPay02sMvv46bhw&limit=1'
    
    request({url, json:true}, (error,response)=>{
        if(error){
            callback('Unable to rach GEO API', undefined)
        } else if(response.body.features.length === 0){
            callback('Invalid address, please try with another address', undefined)
        } else{
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                address: response.body.features[0].place_name
            })
        }
     })
}

module.exports = geocode