let {getLocaisByBloco, getAllLocais, getAllBlocos, insertLocal, apagarLocal, alterarLocal, pegarLocal} = require('../models/LocalModel')

async function getLocaispBloco(req, res) {
    try {
        if (!req.params.bloco || req.params.bloco === 'nulo') {
            return res.json({msg: 'sem alterações.'})
        }
        let bloco = req.params.bloco
        let locais = await getLocaisByBloco(bloco)
        return res.json({locais: locais})
    } catch(err) {
        return res.status(err.cause).json({msg: err.message})
    }
}

async function getLocais(req, res) {
    try {
        let locais = await getAllLocais(100, 'DESC', req.params.pag)
        return res.json({locais: locais})
    } catch(err) {
        return res.status(err.cause).json({msg: err.message})
    }
}

async function getBlocos(req, res) {
    try {
        let blocos = await getAllBlocos()
        return res.json({blocos: blocos})
    } catch(err) {
        return res.status(err.cause).json({msg: err.message})
    }
}

async function putLocal(req, res) {
    try {
        let {local, bloco} = req.body
        if (!req.params.id) {
            return res.status(422).json({msg:"id nao informado"})
        }
        let id = parseInt(req.params.id)
        await alterarLocal(id, local, bloco) 
        return res.json({msg: 'alteração em local feita com sucesso!'}) 
    } catch(err) {
        return res.status(err.cause).json({msg: err.message})
    }
}

async function dynamicLocais(req, res) {
    try {
        if (!req.query.pag) {
            return res.redirect('/u/locais?pag=1')
        }
        let pag = parseInt(req.query.pag)
        let locs = await getAllLocais(7, 'DESC', pag)
        if (locs.length === 0 && pag !== 1 || pag < 0 || pag === 0 || isNaN(pag)) {
            return res.redirect('/u/locais?pag=1')
        }
        if (res.locals.user.tipo === 'administrador') {
            return res.render('authNeeded/locais_registrados.ejs', {
            locs: locs,
            pag: pag,
            usuario: res.locals.user.email
        })
        } else {
            return res.render('authNeeded/locais_registrados_user.ejs', {
            locs: locs,
            pag: pag,
            usuario: res.locals.user.email
        })
        }
    } catch(err) {
            console.log(err)
            return res.redirect(`/u/inicial`)
    }
}

async function dynamicLocalCriacao(req, res) {
    try {
        return res.render('authNeeded/local.ejs', {
            usuario: res.locals.user.email
        })
    } catch(err) {
            console.log(err)
            return res.redirect(`/u/inicial`)
    }
}

async function postLocal(req, res) {
    try {
        let {bloco, local} = req.body
        await insertLocal(bloco, local)
        return res.json({msg: 'Local criado com sucesso!'})
    } catch(err) {
        return res.status(err.cause).json({msg: err.message})
    }
}

async function dynamicLocalEdicao(req, res) {
    try {
        if (!req.params.id) {
            return res.status(422).json({msg:"id nao informado."})
        }
        let id = parseInt(req.params.id)
        let loc = await pegarLocal(id)
        return res.render('authNeeded/local_edit.ejs', {
            usuario: res.locals.user.email,
            loc: loc
        })
    } catch(err) {
        return res.status(err.cause).json({msg: err.message})
    }
}

async function deleteLocal(req, res) {
    try {
        if (!req.params.id) {
            return res.status(422).json({msg:'Id não informado.'})
        }
        await apagarLocal(req.params.id)
        return res.json({msg: 'Local deletado com sucesso!'})
    } catch(err) {
        return res.status(err.cause).json({msg:err.message})
    }
}

module.exports = {getLocaispBloco, dynamicLocais, getBlocos, getLocais, dynamicLocalCriacao, postLocal, deleteLocal, dynamicLocalEdicao, putLocal}