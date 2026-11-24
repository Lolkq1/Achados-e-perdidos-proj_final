let {CriarObjeto,ListarObjeto,ListarObjetoPorId,AtualizarObjeto,DeletarObjeto} = require('../models/ObjetoModel')

async function cadastrarObjeto(req, res) {
   try{
    let {descricao,data,situacao,id_local,id_categoria} = req.body

    if(!descricao || !data || !situacao || !id_local || !id_categoria){
        return res.status(400).json({erro:"preencha todos os campos"})
    }

    let ObjetoCriado = await CriarObjeto(descricao,data,situacao,id_local,id_categoria)
    
    return res.status(201).json({
        id: ObjetoCriado,
        descricao,
        data,
        situacao,
        id_local,
        id_categoria
    });
   } catch(erro){
    console.error("erro ao cadastrar objeto",erro);
    return res.status(500).json({erro: "erro interno ao cadastrar objeto."})
   }
}

async function getObjeto(req, res) {
    try {
        let Objeto = await ListarObjeto()
        return res.status(200).json({Objeto})

    } catch (erro) {
        console.error("erro ao listar objeto",erro)
        return res.status(500).json({erro:"erro interno ao listar objeto"})
    }
}

async function getObjetoById(req, res) {
    try {
        let {id} = req.params
        let Objeto = await ListarObjetoPorId(id)
         if(!Objeto){
            return res.status(404).json({erro:"nao existe um objeto com esse id"})
        }

     return res.status(200).json({Objeto})
        
    } catch (erro) {
        console.error("erro ao listar objeto",erro)
        return res.status(500).json({erro:"erro interno ao listar objeto"})
    }
    
}

async function putObjeto(req, res) {
   try {
     let {id} = req.params
    let {descricao,data,situacao,id_local,id_categoria} = req.body
    if(!descricao || !data || !situacao || !id_local || !id_categoria){
        return res.status(400).json({erro:"preencha todos os campos"})
    }
    let Objeto = await AtualizarObjeto(id,descricao,data,situacao,id_local,id_categoria)

    if(Objeto.affectedRows > 0){
        return res.status(200).json({id,descricao,data,situacao,id_local,id_categoria})
    }else{
        return res.status(404).json({erro: "objeto nao encontrado"})
    }
   
   } catch (erro) {
    console.error("erro ao atualizar objeto",erro)
    return res.status(500).json({erro: "erro interno ao atualizar objeto"})
   }
}

async function deleteObjeto(req, res) {
    try {
        let {id} = req.params
        let Objeto = await DeletarObjeto(id)
        if(Objeto.affectedRows === 0){
            return res.status(404).json({erro: "nao existe objeto com esse id"})
        }else if (Objeto.affectedRows > 0){
            return res.status(200).json({mensagem:"objeto deletado"})
        }

    } catch (erro) {
        console.error("erro ao deletar objeto",erro)
        return res.status(500).json({erro:"erro interno ao deletar objeto"})
    }
}

module.exports = {cadastrarObjeto,getObjeto,getObjetoById,putObjeto,deleteObjeto}