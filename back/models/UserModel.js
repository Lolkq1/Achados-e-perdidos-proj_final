const pool = require('../db')
const bcrypt = require('bcrypt')
async function insertUser(nome, email, senha, tipo) {
    try {
       let bcrypt = require('bcrypt')
       let hash = await bcrypt.hash(senha, 10)
       let [newUser] = await pool.execute("INSERT INTO usuario (nome, email, senha, tipo) VALUES (?,?,?,?)", [nome, email, hash, tipo])
       return newUser.insertId
    } catch(err) {
        if (err.errno == 1062) {
            throw new Error("Este email já está sendo utilizado.", {cause: 422})
        } else {
        console.log(err)
            throw new Error("Erro interno do servidor", {cause: 500})
        }
    }
}

async function getUserByEmail(email) {
    try {
        let [user] = await pool.execute("SELECT * FROM usuario WHERE email=?", [email])
        if (user.length === 0) {
            throw new Error("Usuário não encontrado", {cause: 404})
        } else {
            return user[0]
        }
    } catch(err) {
        throw err;
    }
}

async function getUserById(id) {
    try {
        let [user] = await pool.execute("SELECT * FROM usuario WHERE id=?", [id])
        if (user.length === 0) {
            throw new Error("Usuário não encontrado", {cause: 404})
        } 
        return user[0]
    } catch (err) {
        throw new Error("Erro interno do servidor", {cause: 500})
    }
}

module.exports = {
    insertUser,
    getUserByEmail,
    getUserById
}