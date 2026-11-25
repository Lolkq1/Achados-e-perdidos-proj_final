const pool = require('../../ehbrinksnepo/Achados-e-perdidos-proj_final/back/db')

async function CriarEtiqueta(marca,cor,material) {
    try {
        let [etiqueta] = await pool.execute('INSERT INTO etiqueta (marca, cor, material) VALUES (?,?,?)',[marca,cor,material])
        return etiqueta.insertId
    } catch(err) {
        throw new Error("kratos_sheikmar3000",{cause: 500})
    }

}

async function ListarEtiqueta() {
    try {
        let [etiqueta] = await pool.execute('SELECT * FROM etiqueta')
        return etiqueta
    } catch(err) {
        throw new Error("kratos_sheikmar3000",{cause: 500})
    }
}

async function ListarDynamicEtiqueta(pag, ordem, limit) {
    try {
        let [etiqueta] = await pool.execute(`SELECT * FROM etiqueta ORDER BY id ${ordem} LIMIT ? OFFSET ?`, [limit, (pag-1)*limit])
        return etiqueta
    } catch(err) {
        console.log(err)
        throw new Error("kratos_sheikmar3000",{cause: 500})
    }
}

async function ListarEtiquetaPorId(id) {
    try {
        let [etiqueta] = await pool.execute('SELECT * FROM etiqueta WHERE id = ?',[id])
        if (etiqueta.length === 0) {
            throw new Error("etiqueta não encontrada", {cause : 404})
        }
        return etiqueta[0]
    } catch(err) {
        throw new Error("kratos_sheikmar3000",{cause: 500})
    }
}

async function ListarEtiquetaCor() {
    try {
        let [etiqueta] = await pool.execute('SELECT * FROM etiqueta WHERE cor IS NOT NULL')
        
        return etiqueta
    } catch(err) {
        throw new Error('erro interno do servidor', {cause: 500})
    }
    
}

async function ListarEtiquetaMaterial() {
    try {
       let [etiqueta] = await pool.execute('SELECT * FROM etiqueta WHERE material IS NOT NULL')
       return etiqueta
    } catch(err) {
        throw new Error('erro interno do servidor', {cause: 500})
    }
}

async function ListarEtiquetaMarca() {
    try {
        let [etiqueta] = await pool.execute('SELECT * FROM etiqueta WHERE marca IS NOT NULL');
        return etiqueta
    } catch(err) {
        throw new Error('erro interno do servidor', {cause: 500})
    }
}

async function AtualizarEtiqueta(id,marca,cor,material){
    try {
    let [etiqueta] = await pool.execute('UPDATE etiqueta SET marca = ?, cor = ?, material = ? WHERE id = ?',[marca,cor,material,id])
    return etiqueta
    } catch(err) {
        throw new Error('erro interno do servidor', {cause: 500})
    }
}

async function DeletarEtiqueta(id) {
    try {
       let etiqueta = await pool.execute('DELETE FROM etiquetaObjeto WHERE id_etiqueta = ?', [id])
       return Etiqueta
    } catch(err) {
        throw new Error('erro interno do servidor', {cause: 500})
    }
    
}

async function ApagarEtiqueta(id) {
    try {
       let [etiqueta] = await pool.execute('DELETE FROM etiqueta WHERE id = ?', [id])
       return etiqueta
    } catch(err) {
        throw new Error('erro interno do servidor', {cause: 500})
    }
}

module.exports = {CriarEtiqueta,ListarEtiqueta,ListarEtiquetaPorId,AtualizarEtiqueta,DeletarEtiqueta, ListarEtiquetaMarca, ListarEtiquetaCor, ListarEtiquetaMaterial, ListarDynamicEtiqueta, ApagarEtiqueta}