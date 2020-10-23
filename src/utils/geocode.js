const request = require("request");

const forecast = (latitude, longitude , callback) =>{
    
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=9b5b6f80b2e1cf155795065665eb3ba3`;
    // const url = "http://api.openweathermap.org/data/2.5/weather?lat=-75.7088&lon=44.1545&appid=9b5b6f80b2e1cf155795065665eb3ba3"

    

    request({url : url ,json :true}, (error , response)=>{

        // console.log(response.body.coord)

        // console.log(response.body)
 
            if (error) {
                callback('unable to connect', undefined);
            }else if(response.body.name == null){
                callback('unable to find location. Try another search. ' , undefined)
            }else{
                callback(undefined, {
                    latitude: response.body.coord.lat,
                    longitude: response.body.coord.lon,
                    location: response.body.name
                })
            }
    })
}


const geocode = (address , callback) =>{
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYW1yZWxzaGVoYWx5IiwiYSI6ImNrZzVwY3V3MDB3bm0ycW81cXkwMHRmYXYifQ.cDYSGK7_9rxcLkc4FYzYBQ&limit=1';
   
    request({url : url , json :true}, (error,response)=>{

        // console.log(response.body)

        if (error) {
            callback('unable to connect', undefined);
        }else if(response.body.features.length === 0){
            callback('unable to find location. Try another search. ' , undefined)
        }else{
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
            })
        }
    })
}


module.exports = {
    forecast,geocode
}


