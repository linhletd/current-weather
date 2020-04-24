const mysql = require('mysql');
const dotenv = require('dotenv').config();
let conn = mysql.createConnection({
    database: 'DATAWORLD',
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD
})

conn.connect((err) => {
    if(err) throw err;

    conn.query('CREATE DATABASE DATAWORLD',(err, result) => {
        if (err) throw err;
        console.log('Database created');
    })



    conn.query(`CREATE TABLE visitorcount(
        year INTEGER PRIMARY KEY,
        visitor_count INTEGER NOT NULL,
        total_visitors INTEGER NOT NULL
        )`,(err, result) =>{
            if (err) throw err;
            console.log('Table created')
        }
    )

    conn.query(`CREATE TABLE catsvdogs(
        location VARCHAR(255) NOT NULL,
        region VARCHAR(255) NOT NULL,
        household_qty INTEGER NOT NULL,
        pet_household_perctg DECIMAL(3,1),
        pet_household_qty INTEGER NOT NULL,
        dog_household_perctg DECIMAL(3,1),
        dog_household_qty INTEGER NOT NULL,
        mean_dog_per_household DECIMAL(3,1),
        dog_population INTEGER NOT NULL,
        cat_household_perctg DECIMAL(3,1),
        cat_household_qty INTEGER NOT NULL,
        mean_cat_per_household DECIMAL(3,1),
        cat_population INTEGER NOT NULL
    )`, (err, result) =>{
        if (err) throw err;
        console.log ('catsvdogs table created')
    })

    conn.query(`CREATE TABLE counties (
        county VARCHAR(80) NOT NULL,
        county_number INT,
        population INTEGER
    )`,(err, result) => {
        if(err) throw err;
        console.log('counties table created')
    })

    conn.query(`CREATE TABLE products(
       item_no INTEGER,
       category_name VARCHAR(80),
       item_description VARCHAR(80),
       vendor INTEGER,
       vendor_name VARCHAR(80),
       bottle_size INTEGER,
       pack INTEGER,
       inner_pack INTEGER,
       age VARCHAR(10),
       proof INTEGER,
       list_date DATE,
       upc BIGINT,
       scc BIGINT,
       bottle_price VARCHAR(10),
       self_price REAL,
       case_cost REAL
    )`,(err, result) => {
            if(err) throw err;
            console.log('products table created')
    })

    conn.query(`CREATE TABLE sales (
        date DATE,
        convenience_store CHAR(1),
        store INTEGER,
        county_number INTEGER,
        county VARCHAR(80),
        category INTEGER,
        category_name VARCHAR(80),
        vendor_no INTEGER,
        vendor VARCHAR(80),
        item INTEGER,
        description VARCHAR(120),
        pack TINYINT(255),
        little_size INTEGER,
        state_btl_cost VARCHAR(10),
        btl_price VARCHAR(10),
        btl_qty INTEGER,
        total REAL
    )`, (err, result) => {
        if (err) throw err;
        console.log('table sales created')
    })

    conn.query(`CREATE TABLE stores (
        stores INTEGER,
        name VARCHAR(80),
        store_status CHAR(1),
        store_address VARCHAR(255),
        address_info TEXT(500)
    )`, (err, result) =>{
        if(err) throw err;
        console.log('stores table created')
    })
    
    conn.query(`CREATE TABLE stores_convenience (
        store INTEGER,
        county VARCHAR(80)
    )`,(err, result) => {
        if(err) throw err;
        console.log('stores_convenience created')
    })

    conn.query(`CREATE TABLE sales_2016 (
        invoice CHAR(12),
        date VARCHAR(15),
        store_number INTEGER,
        store_name VARCHAR(80),
        address VARCHAR(255),
        city VARCHAR(80),
        zip_code INTEGER,
        store_location VARCHAR(255),
        county_number INTEGER,
        county VARCHAR(80),
        category INTEGER,
        category_name VARCHAR(80),
        vendor_number INTEGER,
        vendor_name VARCHAR(80),
        item_number INTEGER,
        item_description VARCHAR(80),
        pack TINYINT(255),
        botle_volume INTEGER,
        state_btl_cost REAL,
        state_btl_retail REAL,
        botles_sold INTEGER,
        sale REAL,
        volumn_sold_gal REAL,
        volumn_sold_lt REAL
    )`, (err, result) =>{
        if(err) throw err;
        console.log('sales_2016 table created')
    })


})
