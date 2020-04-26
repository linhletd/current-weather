const fs = require('fs');
const mysql = require('mysql');
const dotenv = require('dotenv').config();
const insertRecords = require('./utils/file2db.js');
const {dbToFile,dbTofile_alt} = require('./utils/db2file.js')


let {fileToDB,fileToDB_alt} = insertRecords;
let conn = mysql.createConnection({
    database: 'DATAWORLD',
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD
})

conn.connect((err) => {
    if(err) throw err;
    console.log('start...')
    //upload data to MYSQL DB
    fileToDB(conn, 'visitorcount','./countvisitor.tsv', '\t' );
    fileToDB(conn, 'catsvdogs', './catsvdogs2.csv', ',' );
    fileToDB(conn, 'counties', './counties.csv', ',' );
    fileToDB(conn, 'sales', './sales.csv', ',' );
    fileToDB_alt(conn, 'stores', './stores.csv', ',' );
    fileToDB_alt(conn, 'stores_convenience', './stores_convenience.csv', ',' );
    fileToDB_alt(conn, 'sales_2016', './sales_2016.csv', ',' );

    //download data from DB
    dbToFile(conn,'check.csv', 'stores');



})