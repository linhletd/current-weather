require('dotenv').config();
module.exports = {
    entry: './public/scripts/script.js',
    output: {
        path: __dirname + '/public/scripts',
        filename: 'processed_script.js'
    },
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [['@babel/plugin-transform-runtime',{
                            "absoluteRuntime": false,
                            "corejs": false,
                            "helpers": true,
                            "regenerator": true,
                            "useESModules": false,
                            "version": "7.0.0-beta.0"
                          }]]
                    }
                }
            }
        ]
    } 
}
