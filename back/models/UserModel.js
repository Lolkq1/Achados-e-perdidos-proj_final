const pool = require('../db')
const bcrypt = require('bcrypt')

async function insertUser(nome, email, senha, tipo) {
    try {
        let hash = await bcrypt.hash(senha, 10)
        let tipoFormatado = (tipo && tipo.trim() !== '') ? tipo.toLowerCase() : 'comum'
        let [newUser] = await pool.execute(
            "INSERT INTO usuario (nome, email, senha, tipo) VALUES (?,?,?,?)",
            [nome, email, hash, tipoFormatado]
        )
        return newUser.insertId
    } catch (err) {
        console.log("ERRO NO CADASTRO:", err)
        if (err.errno == 1062) {
            throw new Error("Este email já está sendo utilizado.", { cause: 422 })
        }
        throw new Error(err.sqlMessage || err.message || "Falha ao inserir no banco", { cause: 500 })
    }
}

async function getUserByEmail(email) {
    try {
        let [user] = await pool.execute("SELECT * FROM usuario WHERE email = ?", [email])
        if (user.length === 0) {
            throw new Error("usuário não encontrado.", { cause: 404 })
        }
        return user[0]
    } catch (err) {
        if (err.cause === 404) throw err
        console.log("ERRO NO LOGIN:", err)
        throw new Error(err.sqlMessage || err.message || "Falha ao consultar banco", { cause: 500 })
    }
}

async function getUserById(id) {
    try {
        let [user] = await pool.execute("SELECT * FROM usuario WHERE id = ?", [id])
        if (user.length === 0) {
            throw new Error("usuário não encontrado.", { cause: 404 })
        }
        return user[0]
    } catch (err) {
        if (err.cause === 404) throw err
        console.log("ERRO AO BUSCAR USUÁRIO:", err)
        throw new Error(err.sqlMessage || err.message || "Falha ao consultar banco", { cause: 500 })
    }
}

module.exports = { insertUser, getUserByEmail, getUserById }