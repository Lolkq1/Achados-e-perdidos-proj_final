const pool = require('../db')

async function CriarObjeto(descricao,data,situacao,id_local,id_categoria){
    let [objeto] = await pool.execute('INSERT INTO objeto (descricao, data, situacao, id_local, id_categoria) VALUES (?,?,?,?,?)', [descricao,data,situacao,id_local,id_categoria])
    return objeto.insertId
}

async function ListarObjeto(){
    let [objeto] = await pool.execute('SELECT * FROM objeto')
    return objeto
}

async function ListarObjetoPorId(id){
    let [objeto] = await pool.execute('SELECT * FROM objeto WHERE id = ?',[id])
    return objeto[0]    
}

async function AtualizarObjeto(id,descricao,data,situacao,id_local,id_categoria) {
    let [objeto] = await pool.execute('UPDATE objeto SET descricao = ?, data = ?, situacao = ?, id_local = ?, id_categoria = ? WHERE id = ?', [descricao,data,situacao,id_local,id_categoria,id])
    return objeto
}

async function DeletarObjeto(id){
    await pool.execute('DELETE FROM etiquetaObjeto WHERE id_objeto = ?', [id])
    let [objeto] = await pool.execute('DELETE FROM objeto WHERE id = ?',[id])
    return objeto
}

module.exports = {CriarObjeto,ListarObjeto,ListarObjetoPorId,AtualizarObjeto,DeletarObjeto}


    
