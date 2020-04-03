module.exports = function(app){
    app.use(function(req, res, next) {
        res.status(404)
            .type('text')
            .send('Not Found');
            next()
        }
    );
    app.use(function (err, req, res, next) {
            console.error(err.stack)
            res.status(500).send('Internal server error: '+ err.message)
        }
    )
}