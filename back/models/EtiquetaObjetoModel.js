const pool = require('../db')

async function CriarEtiquetaObjeto(id_etiqueta,id_objeto) {
    let [etiquetaObjeto] = await pool.execute('INSERT INTO etiquetaObjeto (id_etiqueta,id_objeto) VALUES (?,?)',[id_etiqueta,id_objeto])
    return etiquetaObjeto.insertId
}

async function ListarEtiquetaObjeto() {
    let [etiquetaObjeto] = await pool.execute('SELECT * FROM etiquetaObjeto')
    return etiquetaObjeto
}

async function ListarEtiquetaObjetoPorId(id) {
    let [etiquetaObjeto] = await pool.execute('SELECT * FROM etiquetaObjeto WHERE id = ?',[id])
    return etiquetaObjeto[0]
}

async function ListarPorEtiqueta(id_etiqueta) {
    let [etiquetaObjeto] = await pool.execute('SELECT * FROM etiquetaObjeto WHERE id_etiqueta = ?',[id_etiqueta])
    return etiquetaObjeto
}

async function ListarPorObjeto(id_objeto) {
    let [etiquetaObjeto] = await pool.execute('SELECT * FROM etiquetaObjeto WHERE id_objeto = ?',[id_objeto])
    return etiquetaObjeto
}

async function AtualizarEtiquetaObjeto(id,id_etiqueta,id_objeto){
    let [etiquetaObjeto] = await pool.execute('UPDATE etiquetaObjeto SET id_etiqueta = ?, id_objeto = ? WHERE id = ?',[id_etiqueta,id_objeto,id])
    return etiquetaObjeto
}

async function DeletarEtiquetaObjeto(id) {
    let [etiquetaObjeto] = await pool.execute('DELETE FROM etiquetaObjeto WHERE id = ?',[id])
    return etiquetaObjeto
}

module.exports = {CriarEtiquetaObjeto,ListarEtiquetaObjeto,ListarEtiquetaObjetoPorId,ListarPorEtiqueta,ListarPorObjeto,AtualizarEtiquetaObjeto,DeletarEtiquetaObjeto}