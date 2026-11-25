let mod = require('../models/EtiquetaModel')
let {CriarEtiqueta,ListarEtiqueta,ListarEtiquetaPorId,AtualizarEtiqueta, ApagarEtiqueta} = require('../models/EtiquetaModel')


async function dynamicEtiqueta(req, res) {
    try {
        let pag = parseInt(req.query.pag)
        if (pag < 0 || pag === 0 || isNaN(pag)) {
            return res.redirect('/u/etiquetas?pag=1')
        }
        let etqs = await mod.ListarDynamicEtiqueta(pag, 'DESC', 7)
        console.log('n ta aki')
        if (etqs.length === 0 && pag !== 1) {
                return res.redirect('/u/etiquetas/')
            }
        if (res.locals.user.tipo !== 'administrador') {
            return res.render('authNeeded/etiquetas_registradas_user.ejs', {
                etqs: etqs,
                pag: pag,
                usuario: res.locals.user.email
            })
        }
        return res.render('authNeeded/etiquetas_registradas.ejs', {
            etqs: etqs,
            pag: pag,
            usuario: res.locals.user.email
        })
    } catch(err) {
        return res.redirect('/u/inicial')
    }
    
}

async function dynamicEtiquetaEditar(req, res) {
    try {
        if (!req.params.id) {
            return res.status(422).json({msg: 'Id nao informado.'})
        }
        let id = req.params.id
        let etq = await mod.ListarEtiquetaPorId(id)
        return res.render("authNeeded/etiquetaedit.ejs", {
            etiqueta: etq,
            usuario: res.locals.user.email
        })
    } catch(err) {
        throw new Error("kratos_sheikmar3000",{cause: 500})
    }

}

async function dynamicEtiquetaCriacao(req, res) {
    try {
        return res.render("authNeeded/etiqueta.ejs", {
            usuario: res.locals.user.email
        })
    } catch(err) {
        throw new Error("kratos_sheikmar3000",{cause: 500})
    }

}

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

async function getEtiquetas(req, res) {
    try {
        let Etiqueta = await ListarEtiqueta()
        return res.status(200).json({etiqueta: Etiqueta})

    } catch (erro) {
        console.error("erro ao listar etiqueta",erro)
        return res.status(500).json({erro:"erro interno ao listar etiqueta"})
    }
}

async function getEtiqueta(req, res) {
    try {
        let {id} = req.params
        let Etiqueta = await ListarEtiquetaPorId(id)
         if(!Etiqueta){
            return res.status(404).json({erro:"nao existe uma etiqueta com esse id"})
        }

     return res.status(200).json({Etiqueta:etiqueta})
        
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
        let Etiqueta = await ApagarEtiqueta(id)
        if(Etiqueta.affectedRows === 0){
            return res.status(404).json({msg: "nao existe etiqueta com esse id"})
        }else if (Etiqueta.affectedRows > 0){
            return res.status(200).json({msg:"etiqueta deletada"})
        }

    } catch (erro) {
        console.error("erro ao deletar etiqueta",erro)
        return res.status(500).json({erro:"erro interno ao deletar etiqueta"})
    }
}

async function postEtiqueta(req, res) {
    try{
            let {marca,cor,material} = req.body
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



module.exports = {dynamicEtiquetaCriacao, dynamicEtiqueta, dynamicEtiquetaEditar, putEtiqueta, getEtiquetas, deleteEtiqueta, getEtiqueta, postEtiqueta}