const jwt = require('jsonwebtoken')
const model = require('../models/UserModel')

async function auth(req, res, next) {
    if (!req.cookies.sessionToken) {
        if (req.originalUrl.startsWith('/api/')) {
            return res.status(401).json({ msg: 'Não autenticado.' })
        }
        return res.redirect('/i/login')
    }
    try {
        let ver = jwt.verify(req.cookies.sessionToken, process.env.privatekey)
        let user = ver.email
            ? await model.getUserByEmail(ver.email)
            : await model.getUserById(parseInt(ver.sub))
        res.locals.user = user
        return next()
    } catch (err) {
        console.log("ERRO NO AUTH:", err)
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
        return res.redirect('/u/locais')
    } catch (err) {
        res.clearCookie('sessionToken')
        return next()
    }
}

module.exports = { auth, reverseAuth }