let pool = require('../db')

async function getLocaisByBloco(bloco) {
    try {
        let [locais] = await pool.execute('SELECT * FROM local WHERE bloco = ?', [bloco])
        return locais
    } catch (err) {
        throw new Error("erro interno do servidor", { cause: 500 })
    }
}

async function getAllBlocos() {
    try {
        let [blocos] = await pool.execute('SELECT DISTINCT bloco FROM local')
        return blocos
    } catch (err) {
        throw new Error("erro interno do servidor", { cause: 500 })
    }
}

async function getAllLocais(limit = 100, ordem = 'DESC', pag = 1) {
    try {
        let ordemSegura = ordem === 'ASC' ? 'ASC' : 'DESC'
        let limiteInt = parseInt(limit) || 100
        let paginaInt = parseInt(pag) || 1
        let offsetInt = limiteInt * (paginaInt - 1)
        let [locais] = await pool.execute(
            `SELECT * FROM local ORDER BY id ${ordemSegura} LIMIT ? OFFSET ?`,
            [String(limiteInt), String(offsetInt)]
        )
        return locais
    } catch (err) {
        throw new Error("erro interno do servidor", { cause: 500 })
    }
}

async function pesquisarLocais(termo) {
    try {
        let busca = `%${termo}%`
        let [locais] = await pool.execute(
            'SELECT * FROM local WHERE nome LIKE ? OR bloco LIKE ? ORDER BY id DESC',
            [busca, busca]
        )
        return locais
    } catch (err) {
        throw new Error("erro interno do servidor", { cause: 500 })
    }
}

async function pegarLocal(id) {
    try {
        let [local] = await pool.execute('SELECT * FROM local WHERE id = ?', [id])
        if (local.length === 0) {
            throw new Error("Local não encontrado.", { cause: 404 })
        }
        return local[0]
    } catch (err) {
        if (err.cause === 404) throw err
        throw new Error("erro interno do servidor", { cause: 500 })
    }
}

async function insertLocal(bloco, nome) {
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

async function alterarLocal(id, nome, bloco) {
    try {
        let [result] = await pool.execute(
            'UPDATE local SET nome = ?, bloco = ? WHERE id = ?',
            [nome, bloco, id]
        )
        return result.affectedRows
    } catch (err) {
        throw new Error("erro interno do servidor", { cause: 500 })
    }
}

async function apagarLocal(id) {
    try {
        let [result] = await pool.execute(
            'DELETE FROM local WHERE id = ?',
            [id]
        )
        return result.affectedRows
    } catch (err) {
        if (err.errno === 1451) {
            throw new Error("Não é possível remover este local pois existem objetos ou solicitações vinculados a ele.", { cause: 409 })
        }
        throw new Error("erro interno do servidor", { cause: 500 })
    }
}

module.exports = {
    getLocaisByBloco,
    getAllLocais,
    getAllBlocos,
    pesquisarLocais,
    pegarLocal,
    insertLocal,
    alterarLocal,
    apagarLocal
}