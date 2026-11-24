let {CriarEtiqueta,ListarEtiqueta,ListarEtiquetaPorId,AtualizarEtiqueta,DeletarEtiqueta} = require('../models/EtiquetaModel')

async function cadastrarEtiqueta(req, res) {
   try{
    let {marca,cor,material} = req.body

    if(!marca || !cor || !material){
        return res.status(400).json({erro:"preencha todos os campos"})
    }

    let EtiquetaCriada = await CriarEtiqueta(marca,cor,material)
    
    return res.status(201).json({
        id: EtiquetaCriada,
        marca,
        cor,
        material,
    });
   } catch(erro){
    console.error("erro ao cadastrar etiqueta",erro);
    return res.status(500).json({erro: "erro interno ao cadastrar etiqueta."})
   }
}

async function getEtiqueta(req, res) {
    try {
        let Etiqueta = await ListarEtiqueta()
        return res.status(200).json({Etiqueta})

    } catch (erro) {
        console.error("erro ao listar etiqueta",erro)
        return res.status(500).json({erro:"erro interno ao listar etiqueta"})
    }
}

async function getEtiquetaById(req, res) {
    try {
        let {id} = req.params
        let Etiqueta = await ListarEtiquetaPorId(id)
         if(!Etiqueta){
            return res.status(404).json({erro:"nao existe uma etiqueta com esse id"})
        }

     return res.status(200).json({Etiqueta})
        
    } catch (erro) {
        console.error("erro ao listar etiqueta",erro)
        return res.status(500).json({erro:"erro interno ao listar etiqueta"})
    }
    
}

async function putEtiqueta(req, res) {
   try {
     let {id} = req.params
    let {marca,cor,material} = req.body
    if(!marca || !cor || !material){
        return res.status(400).json({erro:"preencha todos os campos"})
    }
    let Etiqueta = await AtualizarEtiqueta(id,marca,cor,material)

    if(Etiqueta.affectedRows > 0){
        return res.status(200).json({id,marca,cor,material})
    }else{
        return res.status(404).json({erro: "etiqueta nao encontrada"})
    }
   
   } catch (erro) {
    console.error("erro ao atualizar etiqueta",erro)
    return res.status(500).json({erro: "erro interno ao atualizar etiqueta"})
   }
}

async function deleteEtiqueta(req, res) {
    try {
        let {id} = req.params
        let Etiqueta = await DeletarEtiqueta(id)
        if(Etiqueta.affectedRows === 0){
            return res.status(404).json({erro: "nao existe etiqueta com esse id"})
        }else if (Etiqueta.affectedRows > 0){
            return res.status(200).json({mensagem:"etiqueta deletada"})
        }

    } catch (erro) {
        console.error("erro ao deletar etiqueta",erro)
        return res.status(500).json({erro:"erro interno ao deletar etiqueta"})
    }
}

module.exports = {cadastrarEtiqueta,getEtiqueta,getEtiquetaById,putEtiqueta,deleteEtiqueta}