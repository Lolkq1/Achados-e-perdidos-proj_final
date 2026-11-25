const {getObjetosUser, getObjetos, getObjetosPerdidos, insertObjeto, DeletarObjeto, AtualizarObjeto, ListarObjetoPorId} = require("../models/ObjetoModel")
const {getAllBlocos, getLocaisByBloco} = require('../models/LocalModel')
const {getAllCategorias} = require('../models/CategoriaModel')
const {ListarEtiqueta, ListarEtiquetaCor, ListarEtiquetaMaterial, ListarEtiquetaMarca} = require('../models/EtiquetaModel')
const { detalhesListarPorObjeto } = require("../models/EtiquetaObjetoModel")

async function dynamicObjetos(req, res) {
    try {
        let pag = parseInt(req.query.pag)
        if (pag < 0 || pag === 0 || isNaN(pag)) {
            return res.redirect('/u/objetos?pag=1')
        }
        if (res.locals.user.tipo !== 'administrador') {
            let objs = await getObjetosUser(7, 'DESC', pag)
            if (objs.length === 0 && pag !== 1) {
                return res.redirect('/u/objetos/')
            }
            return res.render('authNeeded/objetos_registrados_user.ejs', {
                objs: objs,
                pag: pag,
                usuario: res.locals.user.email
            })
        }
        let objs = await getObjetos(7, 'DESC', pag)
        if (objs.length === 0 && pag !== 1) {
            return res.redirect('/u/objetos/') 
        }
        return res.render('authNeeded/objetos_registrados.ejs', {
            objs: objs,
            pag: pag,
            usuario: res.locals.user.email
        })
    } catch(err) {
            console.log(err)
            return res.redirect(`/u/inicial`)
    }
}

async function dynamicObjetoCriacao(req, res) {
    try {
        let blocos = await getAllBlocos()
        let categorias = await getAllCategorias()
        let etiquetasCor = await ListarEtiquetaCor()
        let etiquetasMaterial = await ListarEtiquetaMaterial()
        let etiquetasMarca = await ListarEtiquetaMarca()
        return res.render('authNeeded/objeto.ejs', {
            blocos: blocos,
            usuario: res.locals.user.email,
            categorias: categorias,
            etiquetas: {
                cor: etiquetasCor,
                marca: etiquetasMarca,
                material: etiquetasMaterial
            }
        })
    } catch(err) {
            console.log(err)
            return res.redirect(`/u/objetos`)
    }
}

async function dynamicObjetoEditar(req, res) {
    try {
        if (!req.params.id) {
            return res.status(422).json({msg: 'id não informado.'})
        }
        let obj = await detalhesListarPorObjeto(req.params.id)
        console.log(obj[0])
        let blocos = await getAllBlocos()
        let locaisInit = await getLocaisByBloco(obj[0].obj_bloco)
        let categorias = await getAllCategorias()
        let etiquetasCor = await ListarEtiquetaCor()
        let etiquetasMaterial = await ListarEtiquetaMaterial()
        let etiquetasMarca = await ListarEtiquetaMarca()
        let obj2 = {}
        for (let x of obj) {
            if (x.etq_cor) {
                obj2.cor = x.etq_id
            }
            if (x.etq_mar) {
                obj2.mar = x.etq_id
            }
            if (x.etq_mat) {
                obj2.mat = x.etq_id
            }
        }
        obj2.resto = obj[0]
        let [dia, mes, ano] = obj2.resto.obj_data.toLocaleString('PT-BR').split(',')[0].split('/')
        let datnovo = `${ano}-${mes}-${dia}`
        obj2.resto.obj_data = datnovo 
        return res.render('authNeeded/objeto_edit.ejs', {
            obj: obj2,
            blocos: blocos,
            locaisInit: locaisInit,
            categorias: categorias,
            usuario: res.locals.user.email,
            etiquetas: {
                cor: etiquetasCor,
                marca: etiquetasMarca,
                material: etiquetasMaterial
            }
        })
    } catch(err) {
        console.log(err)
        return res.redirect('/u/objetos')
    }
}

async function postObjeto(req, res) {
    try {
        let {descricao, etiquetas, local, data, turno, categoria} = req.body
        if (new Date(data).getTime() > new Date().getTime()) {
            return res.status(422).json({msg:'a data em que o objeto foi perdido não pode ser depois do dia hoje.'})
        }
        console.log(data)
        await insertObjeto(data, local, categoria, descricao, etiquetas, turno)
        return res.status(201).json({msg: "Objeto criado com sucesso."})
    } catch(err) {
        return res.status(err.cause).json({msg: err.message})
    }
}

async function deleteObjeto(req, res) {
    try {
        if (!req.params.id) {
            return res.status(422).json({msg: 'id nao informado'})
        }
        await DeletarObjeto(req.params.id)
        return res.json({msg: 'Objeto deletado!'})
    } catch(err) {
        return res.status(err.cause).json({msg: err.message})
    }
}

async function putObjeto(req, res) {
    try {
        let {descricao, data, situacao, turno, local, categoria, etiquetas} = req.body
        console.log("put objeto:",String(req.body))
        await AtualizarObjeto(req.params.id, descricao, data, situacao, local, categoria, turno, etiquetas)
        return res.json({msg:'objeto atualizado.'})
    } catch(err) {
        return res.status(500).json({msg: 'erro intenro do serovdir'})
    }
}

module.exports = {dynamicObjetos, dynamicObjetoCriacao, dynamicObjetoEditar, postObjeto, deleteObjeto, putObjeto}