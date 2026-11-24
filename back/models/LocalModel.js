let pool = require('../db')

async function getLocaisByBloco(bloco) {
    try {
        let [locais] = await pool.execute('SELECT * FROM local WHERE bloco = ?', [bloco])
        return locais
    } catch (err) {
        throw new Error("erro interno do servidor", { cause: 500 })
    }
}

async function createLocal(bloco, nome) {
    try {
        let [result] = await pool.execute(
            'INSERT INTO local (bloco, nome) VALUES (?, ?)',
            [bloco, nome]
        )
        return { id: result.insertId, bloco, nome }
    } catch (err) {
        throw new Error("erro interno do servidor", { cause: 500 })
    }
}

async function getAllLocais() {
    try {
        let [locais] = await pool.execute('SELECT * FROM local')
        return locais
    } catch (err) {
        throw new Error("erro interno do servidor", { cause: 500 })
    }
}

async function updateLocal(id, bloco, nome) {
    try {
        let [result] = await pool.execute(
            'UPDATE local SET bloco = ?, nome = ? WHERE id = ?',
            [bloco, nome, id]
        )
        return result.affectedRows
    } catch (err) {
        throw new Error("erro interno do servidor", { cause: 500 })
    }
}

async function deleteLocal(id) {
    try {
        let [result] = await pool.execute(
            'DELETE FROM local WHERE id = ?',
            [id]
        )
        return result.affectedRows
    } catch (err) {
        throw new Error("erro interno do servidor", { cause: 500 })
    }
}

module.exports = {
    getLocaisByBloco,
    createLocal,
    getAllLocais,
    updateLocal,
    deleteLocal
}