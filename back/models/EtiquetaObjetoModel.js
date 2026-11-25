const pool = require('../../ehbrinksnepo/Achados-e-perdidos-proj_final/back/db')

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

async function detalhesListarPorObjeto(id_objeto) {
    let [etiquetaObjeto] = await pool.execute('SELECT o.descricao as obj_descricao, l.bloco as obj_bloco, l.id as obj_local, o.situacao as obj_situacao, o.data as obj_data, o.id_categoria as obj_categoria, o.turno as obj_turno, o.id as obj_id, e.marca as etq_marca, e.cor as etq_cor, e.material as etq_material, e.id as etq_id FROM etiquetaObjeto as eo JOIN etiqueta as e ON eo.id_etiqueta = e.id JOIN objeto as o ON eo.id_objeto = o.id JOIN local as l ON o.id_local = l.id where id_objeto = ?', [id_objeto])
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

async function DeletarEtiquetasObjeto(id_objeto) {
    try {
        await pool.execute('DELETE FROM etiquetaObjeto WHERE id_objeto = ?', [id_objeto])
    } catch(err) {
        throw new Error(err.message, {cause: 500})
    }
}

module.exports = {CriarEtiquetaObjeto,ListarEtiquetaObjeto,ListarEtiquetaObjetoPorId,ListarPorEtiqueta,ListarPorObjeto,AtualizarEtiquetaObjeto,DeletarEtiquetaObjeto, detalhesListarPorObjeto, DeletarEtiquetasObjeto}