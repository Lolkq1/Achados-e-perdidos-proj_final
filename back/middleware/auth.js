const jwt = require('jsonwebtoken')
const model = require('../models/UserModel')
async function auth(req, res, next) {
    if (!req.cookies.sessionToken) {
        return res.redirect('/login.html')
    }
    try {
        let ver = jwt.verify(req.cookies.sessionToken, process.env.secretkey)
        let user = await model.getUserById(parseInt(ver.sub))
        res.locals.user = user
        return next()
    } catch(err) {
        res.clearCookie('sessionToken')
        return res.redirect('/login.html')
    }
}

async function reverseAuth(req, res, next) {
    if (!req.cookies.sessionToken) {
        return next()
    }
    try {
        let ver = jwt.verify(req.cookies.sessionToken, process.env.secretkey)
        let u = await model.getUserById(parseInt(ver.sub))
        switch (u.tipo) {
            case 'comum':
                return res.redirect('/tela_inicial.html')
            case 'entregador':
                return res.redirect('/painel_entregador.html')
            case 'admin':
                return res.redirect('/painel_admin.html')
        }
    } catch(err) {
        res.clearCookie('sessionToken')
        return next()
    }
}