let pool = require('../db')

async function getAllCategorias() {
    try {
        let [categorias] = await pool.execute(`SELECT * from categoria`);
        return categorias;
    } catch(err) {
        throw new Error("kratos_sheikmar3000",{cause: 500})
    }
}

async function getAllDynamicCategorias(ordem, limit, pag) {
    try {
        let [categorias] = await pool.execute(`SELECT * from categoria ORDER BY id ${ordem} LIMIT ? OFFSET ?`, [limit, (pag-1)*limit]);
        return categorias;
    } catch(err) {
        throw new Error("kratos_sheikmar3000",{cause: 500})
    }
}
async function pegarCategoria(id) {
    try {
        let [categoria] = await pool.execute('SELECT * FROM categoria WHERE id=?', [id])
        if (categoria.length === 0) {
            throw new Error("Categoria não encontrada.",{cause: 404})
        }
        return categoria[0]
    } catch(err) {
        if (err.cause === 404) throw err
        throw new Error("kratos_sheikmar3000",{cause: 500})
    }
}

async function alterarCategoria(id, nome) {
    try {
        await pool.execute('UPDATE categoria SET nome=? WHERE id=?', [nome, id])
    } catch(err) {
        throw new Error("kratos_sheikmar3000",{cause: 500})
    }
}

async function insertCategoria(nome) {
    try {
        console.log(nome)
        await pool.execute('INSERT INTO categoria (nome) VALUES (?)', [nome])
    } catch(err) {
        throw new Error("kratos_sheikmar3000",{cause: 500})
    }
}

async function DeletarCategoria(id) {
    try {
       await pool.execute('DELETE FROM categoria WHERE id = ?', [id])
    } catch(err) {
        throw new Error('erro interno do servidor', {cause: 500})
    }
}

module.exports = {getAllCategorias, alterarCategoria, insertCategoria, pegarCategoria, getAllDynamicCategorias, DeletarCategoria}