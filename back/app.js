require('dotenv').config()
const express = require('express')
const app = express()
const cookie_parser = require('cookie-parser')
let userRouter = require('./routes/UserRouter')
let SolicitacaoRouter = require('./routes/SolicitacaoRouter')
let localrouter = require('./routes/LocalRouter')
let dSR = require('./routes/dynamicSolicitacaoRouter')
let {auth, reverseAuth} = require('./middleware/auth')
const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../front/'))
app.use(express.json())
app.use(cookie_parser())
app.use('/api/user/', userRouter)
app.use('/api/solicitacao/', SolicitacaoRouter)
app.use('/api/local/', localrouter)

app.use('/u/', auth, dSR)

app.use('/u/', auth, express.static('../front/authNeeded/', {
    extensions: ['html','js']
}))
app.use('/i/', reverseAuth, express.static('../front/noAuthNeeded/', {
    extensions: ['html', 'js']
}))
app.use(express.static('../front/', {
    extensions: ['html', 'png', 'css']
}))


app.listen(8080, () => {
    console.log("servido rodando em 8080")
})