const bcrypt = require('bcrypt')
const model = require('../models/UserModel')
const jwt = require('jsonwebtoken')
async function login(req, res) {
    console.log(req)
    let {email, senha} = req.body
    try {
        let user = await model.getUserByEmail(email)
        let verification = await bcrypt.compare(senha, user.senha)
        if (!verification) {
            return res.status(401).json({msg: "Senha incorreta inserida."})
        }
        let signed = jwt.sign({
            tipo: user.tipo 
        }, process.env.privatekey, {
            expiresIn: '48h',
            subject: String(user.id)
        })
        res.cookie('sessionToken', signed, {
            httpOnly: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 1000*60*60*48
        })
        return res.json({msg: 'Usuário logado!', tipo: user.tipo})
    } catch(err) {
        console.log(err.cause, err.message)
        return res.status(err.cause).json({msg: err.message})
    }
}

async function signup(req, res) {
    let {nome, email, senha, tipo} = req.body 
    try {
        let userid = await model.insertUser(nome, email, senha, tipo)
        let signed = jwt.sign({
            tipo: tipo 
        }, process.env.privatekey, {
            expiresIn: '48h',
            subject: String(userid)
        })
        res.cookie('sessionToken', signed, {
            httpOnly: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 1000*60*60*48
        })
        res.status(201).json({msg: 'usuário criado com sucesso!', tipo: tipo})
    } catch(err) {
        return res.status(err.cause).json({msg: err.message})
    }
}

async function logout(req, res) {
    res.clearCookie("sessionToken")
    return res.json({msg: "Logout concluido!"})
}

module.exports = {
    signup, login, logout
}