const jwt = require('jsonwebtoken')
const model = require('../models/UserModel')
async function auth(req, res, next) {
    console.log('tauves tenha')
    if (!req.cookies.sessionToken) {
        console.log('n tem')
        return res.redirect('/i/login')
    }
    try {
        console.log('tem mas tem q ve')
        let ver = jwt.verify(req.cookies.sessionToken, process.env.privatekey)
        console.log('um')
        let user = await model.getUserById(parseInt(ver.sub))
        console.log('dos')
        res.locals.user = user
        return next()
    } catch(err) {
        console.log(err)
        res.clearCookie('sessionToken')
        return res.redirect('/i/login')
    }
}

async function reverseAuth(req, res, next) {
    if (!req.cookies.sessionToken) {
        return next()
    }
    try {
        let ver = jwt.verify(req.cookies.sessionToken, process.env.privatekey)
        let u = await model.getUserById(parseInt(ver.sub))
        switch (u.tipo) {
            case 'comum':
                return res.redirect('/u/inicial')
            case 'entregador':
                return res.redirect('/u/painel_entregador')
            case 'admin':
                return res.redirect('/u/painel_admin')
        }
    } catch(err) {
        res.clearCookie('sessionToken')
        return next()
    }
}

module.exports = {auth, reverseAuth}