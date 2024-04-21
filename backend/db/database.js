const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:"localhost",
    port:"3306",
    user:"root",
    password:"qiu1446747873",
    database:"co2"
})

module.exports.connection = connection;