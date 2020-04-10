var unirest = require('unirest');
var bodyParse = require('body-parser');
var dotenv = require('dotenv').config();
var similarity = require('../helpers/similarity')
var resource = {
        url_w: 'https://api.openweathermap.org/data/2.5/weather',
        key_w: process.env.O_WTHR_KEY,
        url_g:'https://geocode.xyz/',
        key_g: process.env.GEO_AUTH
}

function getExternalData(option){
    let req_w = unirest('GET',resource.url_w  );
    // req.headers(requiredHeader);
    option.appid = resource.key_w;
    option.units = 'metric';
    req_w.query(option);
    let p1 = new Promise(function(resolve, reject){
        req_w.end(function(res){
            if(req_w.error){
                reject(error);
            }
            resolve(res.body);
        })
    })
    let p2;
    if(option.lat){
        let req_g = unirest('GET', resource.url_g +`${option.lat},${option.lon}/?json=1&auth=${resource.key_g}`);
        p2 = new Promise(function(resolve, reject){
            req_g.end(function(res){
                if(req_g.error){
                    resolve(undefined);
                }
                resolve(res.body.city);
            })
        }) 
    }
    return Promise.all([p1, p2])
}
module.exports = function(db){
    return {
        currentWeather: function(req, res, next){
            var query = req.body;
            getExternalData(query)
            .then((data) => {
                if(data[0]){
                    data[0].city = data[1]
                    res.json(data[0]);
                }
                else{
                    res.json({message: 'can not get data'})
                }
            })
            .catch((error) => {
                next(error);
            })
        },
        similarity: function(req, res, next){
            res.json(similarity(req.body.des, req.body.src));
        }
        
    }
    
}


