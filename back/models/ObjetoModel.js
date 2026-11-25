const pool = require('../db')
let {CriarEtiquetaObjeto,ListarEtiquetaObjeto,ListarEtiquetaObjetoPorId,ListarPorEtiqueta,ListarPorObjeto,AtualizarEtiquetaObjeto,DeletarEtiquetaObjeto, DeletarEtiquetasObjeto} = require('../models/EtiquetaObjetoModel')
async function getObjetos(limit, ordem, pag) {
    if (!limit) {
        throw new Error('limite (sql display) não informado.', {cause: 422})
    }
    if (!ordem) {
        ordem = 'DESC'
    }
    if (!pag) {
        throw new Error('pagina (sql display) não informado.', {cause: 422})
    }
    try {
        let [objs] = await pool.execute(`select o.*, c.nome as categoria_nome, CONCAT(l.nome, ', ', 'bloco de ', l.bloco) as localformat from objeto as o left join categoria as c on o.id_categoria = c.id left join local as l ON o.id_local = l.id ORDER BY o.id ${ordem} limit ? offset ?`, [limit, (pag-1)*limit])
        return objs
    } catch (err) {
        throw new Error('erro interno do servidor', {cause: 500})
    }
}

async function getObjetosPerdidos(limit, ordem, pag) {
    if (!limit) {
        throw new Error('limite (sql display) não informado.', {cause: 422})
    }
    if (!ordem) {
        ordem = 'DESC'
    }
    if (!pag) {
        throw new Error('pagina (sql display) não informado.', {cause: 422})
    }
    try {
        let [objs] = await pool.execute(`select o.*, c.nome as categoria_nome, CONCAT(l.nome, ', ', 'bloco de ', l.bloco) as localformat from objeto as o left join categoria as c on o.id_categoria = c.id left join local as l ON o.id_local = l.id WHERE o.situacao="Perdido" ORDER BY o.id ${ordem} limit ? offset ?`, [limit, pag*limit])
        return objs
    } catch (err) {
        throw new Error('erro interno do servidor', {cause: 500})
    }
}

async function getObjetosUser(limit, ordem, pag) {
    if (!limit) {
        throw new Error('limite (sql display) não informado.', {cause: 422})
    }
    if (!ordem) {
        ordem = 'DESC'
    }
    if (!pag) {
        throw new Error('pagina (sql display) não informado.', {cause: 422})
    }
    try {
        let [objs] = await pool.execute(`select o.data as data, o.turno as turno, c.nome as categoria_nome, CONCAT(l.nome, ', ', 'bloco de ', l.bloco) as localformat from objeto as o left join categoria as c on o.id_categoria = c.id left join local as l ON o.id_local = l.id WHERE o.situacao="Perdido" AND TIMESTAMPDIFF(day, o.data, NOW()) <= 90 ORDER BY o.id ${ordem} limit ? offset ?`, [limit, (pag-1)*limit])
        return objs
    } catch (err) {
        console.log(err)
        throw new Error('erro interno do servidor', {cause: 500})
    }
}
async function insertObjeto(data, local, categoria, desc, etiqueta_ids, turno) {
    try {
        console.log(data, local, categoria, desc, etiqueta_ids, turno)
        let [obj] = await pool.execute('INSERT INTO objeto (data, id_local, id_categoria, descricao, turno) VALUES (?,?,?,?,?)', [data, local, categoria, desc, turno])
        for (let x of etiqueta_ids) {
            await pool.execute('INSERT INTO etiquetaObjeto (id_objeto, id_etiqueta) VALUES (?,?)', [obj.insertId, x])
        }
        return obj.insertId
    } catch(err) {
        console.log(err)
        throw new Error("erro interno do servidor", {cause: 500})
    }
}



async function ListarObjetoPorId(id){
    let [objeto] = await pool.execute('SELECT * FROM objeto WHERE id = ?',[id])
    return objeto[0]    
}

async function AtualizarObjeto(id,descricao,data,situacao,id_local,id_categoria, turno, etiquetas) {
    try {
        console.log(arguments)
        let [objeto] = await pool.execute('UPDATE objeto SET descricao = ?, data = ?, situacao = ?, id_local = ?, id_categoria = ?, turno =? WHERE id = ?', [descricao,data,situacao,id_local,id_categoria,turno, id])
        await DeletarEtiquetasObjeto(id)
        for (let x of etiquetas) {
            await pool.execute('INSERT INTO etiquetaObjeto (id_objeto, id_etiqueta) VALUES (?,?)', [id, x])
        }
        return
    } catch(err) {
        console.log(err)
        throw new Error('erro interno do servidor', {cause: 500})
    }
}

async function DeletarObjeto(id){
    await pool.execute('DELETE FROM etiquetaObjeto WHERE id_objeto = ?', [id])
    let [objeto] = await pool.execute('DELETE FROM objeto WHERE id = ?',[id])
    return objeto
}

module.exports = {getObjetos, getObjetosUser, getObjetosPerdidos, insertObjeto, DeletarObjeto, AtualizarObjeto, ListarObjetoPorId}