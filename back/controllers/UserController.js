const bcrypt = require('bcrypt')
const model = require('../models/UserModel')
const jwt = require('jsonwebtoken')

async function login(req, res) {
    let { email, senha } = req.body
    try {
        let user = await model.getUserByEmail(email)
        let verification = await bcrypt.compare(senha, user.senha)
        if (!verification) {
            return res.status(401).json({ msg: "Senha incorreta inserida." })
        }
        let userId = user.id || user.id_usuario || user.idUsuario || 1
        let signed = jwt.sign({
            id: userId,
            email: user.email,
            tipo: user.tipo
        }, process.env.privatekey, {
            expiresIn: '48h',
            subject: String(userId)
        })
        res.cookie('sessionToken', signed, {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 1000 * 60 * 60 * 48
        })
        return res.json({ msg: 'Usuário logado!', tipo: user.tipo })
    } catch (err) {
        console.log(err)
        return res.status(err.cause || 500).json({ msg: err.message })
    }
}

async function signup(req, res) {
    let { nome, email, senha, tipo } = req.body
    let tipoFinal = (tipo && tipo.trim() !== '') ? tipo.toLowerCase() : 'comum'
    try {
        let userid = await model.insertUser(nome, email, senha, tipoFinal)
        let signed = jwt.sign({
            id: userid || 1,
            email: email,
            tipo: tipoFinal
        }, process.env.privatekey, {
            expiresIn: '48h',
            subject: String(userid || 1)
        })
        res.cookie('sessionToken', signed, {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 1000 * 60 * 60 * 48
        })
        return res.status(201).json({ msg: 'usuário criado com sucesso!', tipo: tipoFinal })
    } catch (err) {
        console.log(err)
        return res.status(err.cause || 500).json({ msg: err.message })
    }
}

async function logout(req, res) {
    res.clearCookie("sessionToken")
    return res.json({ msg: "Logout concluido!" })
}

module.exports = {
    signup, login, logout
}