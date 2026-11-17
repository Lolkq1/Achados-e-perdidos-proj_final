const mysql2 = require('mysql2/promise')
let pool = mysql2.createPool({
    user: process.env.usersql,
    password: process.env.passwordsql,
    port: 3306,
    database: process.env.databasesql
})

module.exports = pool