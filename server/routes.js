var router = require('express').Router();
var dotenv = require('dotenv').config();
var control = require('../controllers/apis.js');
var MongoClient = require('mongodb').MongoClient;


module.exports = function(app){
    //free db routes below
    var controller = control();
   router.get('/', (req, res) => {
       res.sendFile(process.cwd()+'/views/index.html')
   });
   router.post('/similar',controller.similarity);
   router.post('/apis', controller.currentWeather);

   
    var p = new Promise((resolve, reject) => {
        MongoClient.connect(process.env.DB,{ useUnifiedTopology: true }, (err, client) => {
            if(err){
                
                reject(err);
            }
            else {
               let db = client.db('weatherapp');
               let handler = control(db);
               //routes depend on db below!
            //    router.post('/apis', handler.currentWeather);
            //    router.get('/', (req, res) => {
            //        res.sendFile(process.cwd()+'/views/index.html')
            //    });
               app.db = db;
            //    app.use(router);
               console.log('db connected!'); 
               resolve(db); 
            }
        })
    }).catch((err) => {
        console.error('error occurs when connect to db:',err.message);
    })
    app.use(router);
    return p;
}