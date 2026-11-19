require('dotenv').config()
const express = require('express')
const app = express()
const cookie_parser = require('cookie-parser')
let userRouter = require('./routes/UserRouter')

app.use(cookie_parser())
app.use(express.json())
app.use(express.static("../front"))
app.use('/api/user/', userRouter)

app.set('view engine', 'ejs')

app.listen(8080, () => {
    console.log("servido rodando em 8080")
})