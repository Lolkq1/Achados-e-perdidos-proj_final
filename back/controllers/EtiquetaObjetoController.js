let {CriarEtiquetaObjeto,ListarEtiquetaObjeto,ListarEtiquetaObjetoPorId,ListarPorEtiqueta,ListarPorObjeto,AtualizarEtiquetaObjeto,DeletarEtiquetaObjeto} = require('../models/EtiquetaObjetoModel')

async function cadastrarEtiquetaObjeto(req, res) {
   try{
    let {id_etiqueta,id_objeto} = req.body

    if(!id_etiqueta || !id_objeto){
        return res.status(400).json({erro:"preencha todos os campos"})
    }

    let EtiquetaObjetoCriada = await CriarEtiquetaObjeto(id_etiqueta,id_objeto)
    
    return res.status(201).json({
        id: EtiquetaObjetoCriada,
        id_etiqueta,
        id_objeto
    });
   } catch(erro){
    console.error("erro ao vincular etiqueta ao objeto",erro);
    return res.status(500).json({erro: "erro interno ao vincular etiqueta ao objeto."})
   }
}

async function getEtiquetaObjeto(req, res) {
    try {
        let EtiquetaObjeto = await ListarEtiquetaObjeto()
        return res.status(200).json({EtiquetaObjeto})

    } catch (erro) {
        console.error("erro ao listar vinculo de etiqueta e objeto",erro)
        return res.status(500).json({erro:"erro interno ao listar vinculo de etiqueta e objeto"})
    }
}

async function getEtiquetaObjetoById(req, res) {
    try {
        let {id} = req.params
        let EtiquetaObjeto = await ListarEtiquetaObjetoPorId(id)
         if(!EtiquetaObjeto){
            return res.status(404).json({erro:"nao existe um vinculo com esse id"})
        }

     return res.status(200).json({EtiquetaObjeto})
        
    } catch (erro) {
        console.error("erro ao listar vinculo de etiqueta e objeto",erro)
        return res.status(500).json({erro:"erro interno ao listar vinculo de etiqueta e objeto"})
    }
    
}

async function getEtiquetaObjetoByEtiqueta(req, res) {
    try {
        let {id_etiqueta} = req.params
        let EtiquetaObjeto = await ListarPorEtiqueta(id_etiqueta)
        return res.status(200).json({EtiquetaObjeto})
    } catch (error) {
        console.error("erro ao listar vinculo por id_etiqueta",error)
        return res.status(500).json({erro: "erro interno ao listar vinculo por id_etiqueta"})
    }
}

async function getEtiquetaObjetoByObjeto(req, res) {
    try {
        let {id_objeto} = req.params
        let EtiquetaObjeto = await ListarPorObjeto(id_objeto)
        return res.status(200).json({EtiquetaObjeto})
    } catch (error) {
        console.error("erro ao listar vinculo por id_objeto",error)
        return res.status(500).json({erro: "erro interno ao listar vinculo por id_objeto"})
    }
}

async function putEtiquetaObjeto(req, res) {
   try {
     let {id} = req.params
    let {id_etiqueta,id_objeto} = req.body
    if(!id_etiqueta || !id_objeto){
        return res.status(400).json({erro:"preencha todos os campos"})
    }
    let EtiquetaObjeto = await AtualizarEtiquetaObjeto(id,id_etiqueta,id_objeto)

    if(EtiquetaObjeto.affectedRows > 0){
        return res.status(200).json({id,id_etiqueta,id_objeto})
    }else{
        return res.status(404).json({erro: "vinculo nao encontrado"})
    }
   
   } catch (erro) {
    console.error("erro ao atualizar vinculo de etiqueta e objeto",erro)
    return res.status(500).json({erro: "erro interno ao atualizar vinculo de etiqueta e objeto"})
   }
}

async function deleteEtiquetaObjeto(req, res) {
    try {
        let {id} = req.params
        let EtiquetaObjeto = await DeletarEtiquetaObjeto(id)
        if(EtiquetaObjeto.affectedRows === 0){
            return res.status(404).json({erro: "nao existe vinculo com esse id"})
        }else if (EtiquetaObjeto.affectedRows > 0){
            return res.status(200).json({mensagem:"vinculo deletado"})
        }

    } catch (erro) {
        console.error("erro ao deletar vinculo",erro)
        return res.status(500).json({erro:"erro interno ao deletar vinculo"})
    }
}

module.exports = {cadastrarEtiquetaObjeto,getEtiquetaObjeto,getEtiquetaObjetoById,getEtiquetaObjetoByEtiqueta,getEtiquetaObjetoByObjeto,putEtiquetaObjeto,deleteEtiquetaObjeto}