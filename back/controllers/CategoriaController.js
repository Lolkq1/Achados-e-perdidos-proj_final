let mod = require('../models/CategoriaModel')

async function dynamicCategoria(req, res) {
    try {
        let pag = parseInt(req.query.pag)
        if (pag < 0 || pag === 0 || isNaN(pag)) {
            return res.redirect('/u/categorias?pag=1')
        }
        
        let cats = await mod.getAllDynamicCategorias('DESC', 7, pag)
        if (cats.length === 0 && pag !== 1) {
                return res.redirect('/u/categorias/')
            }
        if (res.locals.user.tipo !== 'administrador') {
            return res.render('authNeeded/categorias_registradas_user.ejs', {
                cats: cats,
                pag: pag,
                usuario: res.locals.user.email
            })
        }
        return res.render('authNeeded/categorias_registradas.ejs', {
            cats: cats,
            pag: pag,
            usuario: res.locals.user.email
        })
    } catch(err) {
        throw new Error("kratos_sheikmar3000",{cause: 500})
    }
    
}

async function dynamicCategoriaEditar(req, res) {
    try {
        if (!req.params.id) {
            return res.status(422).json({msg: 'Id nao informado.'})
        }
        let id = req.params.id
        let cat = await mod.pegarCategoria(id)
        return res.render("authNeeded/categoriaedit.ejs", {
            Categoria: cat, 
            usuario: res.locals.user.email
        })
    } catch(err) {
        throw new Error("kratos_sheikmar3000",{cause: 500})
    }

}

async function dynamicCategoriaCriacao(req, res) {
    try {
        
        return res.render("authNeeded/categoria.ejs", {
            usuario: res.locals.user.email
        })
    } catch(err) {
        throw new Error("kratos_sheikmar3000",{cause: 500})
    }

}

async function putCategoria(req, res) {
    try {
        if (!req.params.id) {
            return res.status(422).json({msg: 'Id nao informado.'})
        }
        let id = req.params.id
        let {nome} = req.body
        await mod.alterarCategoria(id, nome)
        return res.json({msg:'Alteração feita com sucesso!'})
    } catch(err) {
        throw new Error("kratos_sheikmar3000",{cause: 500})
    }

}

async function postCategoria(req, res) {
    try {
        let {nome} = req.body
        await mod.insertCategoria(nome)
        return res.json({msg:'Categoria criada com sucesso!'})
    } catch(err) {
        throw new Error("kratos_sheikmar3000",{cause: 500})
    }

}

async function getCategoria(req, res) {
    try {
        
        if (!req.params.id) {
            return res.status(422).json({msg: 'Id nao informado.'})
        }
         let id = req.params.id
        let cat = await mod.pegarCategoria(id)
        return res.json({Categoria: cat})
    } catch(err) {
        throw new Error("kratos_sheikmar3000",{cause: 500})
    }

}

async function getCategorias(req, res) {
    try {
        let Categorias = await mod.getAllCategorias()
        return res.json({Categorias: Categorias})
    } catch(err) {
        throw new Error("kratos_sheikmar3000",{cause: 500})
    }

}

async function deletarCategoria(req, res) {
    try {
        if (!req.params.id) {
            return res.status(422).json({msg: 'id nao informado'})
        }
        let id = parseInt(req.params.id)
        await mod.DeletarCategoria(id)
        return res.json({msg: 'Categoria deletada com sucesso.'})
    } catch(err) {
        throw new Error("kratos_sheikmar3000", {cause: 500})
    }
}

module.exports = {dynamicCategoria, dynamicCategoriaEditar, putCategoria, getCategoria, getCategorias, dynamicCategoriaCriacao, deletarCategoria, postCategoria}