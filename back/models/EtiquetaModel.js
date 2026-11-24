const pool = require('../db')

async function CriarEtiqueta(marca,cor,material) {
    let [etiqueta] = await pool.execute('INSERT INTO etiqueta (marca, cor, material) VALUES (?,?,?)',[marca,cor,material])
    return etiqueta.insertId
}

async function ListarEtiqueta() {
    let [etiqueta] = await pool.execute('SELECT * FROM etiqueta')
    return etiqueta
}

async function ListarEtiquetaPorId(id) {
    let [etiqueta] = await pool.execute('SELECT * FROM etiqueta WHERE id = ?',[id])
    return etiqueta[0]
}

async function AtualizarEtiqueta(id,marca,cor,material){
    let [etiqueta] = await pool.execute('UPDATE etiqueta SET marca = ?, cor = ?, material = ? WHERE id = ?',[marca,cor,material,id])
    return etiqueta
}

async function DeletarEtiqueta(id) {
      await pool.execute('DELETE FROM etiquetaObjeto WHERE id_etiqueta = ?', [id])
    let [etiqueta] = await pool.execute('DELETE FROM etiqueta WHERE id = ?',[id])
    return etiqueta
}

module.exports = {CriarEtiqueta,ListarEtiqueta,ListarEtiquetaPorId,AtualizarEtiqueta,DeletarEtiqueta}