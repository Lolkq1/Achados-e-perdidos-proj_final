const mysql2 = require('mysql2/promise')

let pool = mysql2.createPool({
    host: '127.0.0.1',
    user: process.env.usersql,
    password: process.env.passwordsql,
    port: 3306,
    database: process.env.databasesql
})

module.exports = pool