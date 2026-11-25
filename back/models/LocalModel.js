let pool = require('../db')

async function getLocaisByBloco(bloco) {
    try {
        let [locais] = await pool.execute('SELECT * FROM local WHERE bloco=?', [bloco])
        console.log(locais)
        return locais 
    } catch(err) {
        console.log(err)
        throw new Error("erro interno do servidor",{cause: 500})
    }
}

async function alterarLocal(id, local, bloco) {
    try {
        await pool.execute('UPDATE local SET nome=?, bloco=? WHERE id=?', [local, bloco, id])
    } catch(err) {
        console.log(err)
        throw new Error("dar não mentality",{cause: 500})
    }

}

async function getAllBlocos() {
    try {
        let [blocos] = await pool.execute('SELECT DISTINCT bloco FROM local')
        return blocos
    } catch(err) {
        throw new Error("erro interno do servidor", {cause: 500})
    }
}

async function getAllLocais(limit, ordem, pag) {
    try {
        let [locais] = await pool.execute(`SELECT * FROM local ORDER BY id ${ordem} limit ? offset ?`, [limit, limit*(pag-1)])
        return locais 
    } catch(err) {
        console.log(err)
        throw new Error("erro interno do servidor",{cause: 500})
    }
}

async function insertLocal(bloco, nome) {
    try {
        let loc = await pool.execute('INSERT INTO local (bloco, nome) VALUES (?,?)', [bloco, nome])
        return loc.resultId
    } catch(err) {
        throw new Error("erro interno do servidor", {cause: 500})
    }
}

async function apagarLocal(id) {
    try {
        await pool.execute('DELETE FROM local WHERE id=?', [id])
        return 
    } catch(err) {
        console.log(err)
        throw new Error('erro intenro do servidor', {cause:500})
    }
}

async function pegarLocal(id) {
    try {
        let [local] = await pool.execute('SELECT * FROM local WHERE id=?', [id])
        if (local.length === 0) {
            throw new Error("local não encontrado.",{cause:404})
        }
        return local[0]
    } catch(err) {
        console.log(err)
        if (err.cause === 404) throw err
        throw new Error('erro intenro do servidor', {cause:500})
    }
}

module.exports = {getLocaisByBloco, getAllLocais, insertLocal, getAllBlocos, apagarLocal, alterarLocal, pegarLocal}