require('dotenv').config()
const express = require('express')
const app = express()
const cookie_parser = require('cookie-parser')
let userRouter = require('./routes/UserRouter')
let SolicitacaoRouter = require('./routes/SolicitacaoRouter')
let localrouter = require('./routes/LocalRouter')
let objetorouter = require('./routes/ObjetoRouter')
let categoriarouter = require('./routes/CategoriaRouter')
let etiquerarouter = require('./routes/EtiquetaRouter')
let dSR = require('./routes/dynamicSolicitacaoRouter')
let dLR = require('./routes/dynamicLocalRouter')
let dOR = require('./routes/dynamicObjetoRouter')
let dCR = require('./routes/dynamicCategoriaRouter')
let dEr = require('./routes/dynamicEtiquetaRouter')
let dUr = require('./routes/dynamicUserRouter')
let {auth, reverseAuth} = require('./middleware/auth')
const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../front/'))
app.use(express.json())
app.use(cookie_parser())

app.use('/api/user/', userRouter)
app.use('/api/solicitacao/', auth, SolicitacaoRouter)
app.use('/api/local/', auth, localrouter)
app.use('/api/objeto/', auth, objetorouter)
app.use('/api/etiqueta/', auth, etiquerarouter)
app.use('/api/categoria/', auth, categoriarouter)

app.use('/u/', auth, dSR, dLR, dOR, dCR, dEr, dUr)

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