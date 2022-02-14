require('dotenv').config();
var mysql = require('mysql');
const {
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT
} = process.env;


//koneksi ke database
const koneksi = mysql.createConnection({
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT
});
koneksi.connect((err) => {
    if (err) throw err;
    console.log('db konek  bos!');
});
module.exports = koneksi;