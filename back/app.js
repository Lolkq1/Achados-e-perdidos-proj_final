require('dotenv').config()
const express = require('express')
let app = express()
let userRouter = require('./routes/UserRouter')

app.use(express.json())
app.use(express.static("../front"))
app.use('/api/user/', userRouter)

app.listen(8080, () => {
    console.log("servido rodando em 8080")
})