let pool = require('../db')

async function getLocaisByBloco(bloco) {
    try {
        let [locais] = await pool.execute('SELECT * FROM local WHERE bloco=?', [bloco])
        return locais 
    } catch(err) {
        throw new Error("erro interno do servidor",{cause: 500})
    }
}

module.exports = {getLocaisByBloco}