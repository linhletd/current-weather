var route = require('./routes.js');
var errorHandle = require('./errors.js')
var bodyParser = require('body-parser');
var express = require('express');
var morgan = require('morgan')
console.log(process.cwd());

module.exports = function(app){
    app.use(morgan('dev'));
    // app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json());
    app.use('/public', express.static(process.cwd()+'/public'),express.static(process.cwd()+'/node_modules'));
    var p = route(app);

    p.finally(()=>{
        errorHandle(app);
    })


      

}
