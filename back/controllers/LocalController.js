let {
    getLocaisByBloco,
    getAllLocais,
    getAllBlocos,
    pesquisarLocais,
    pegarLocal,
    insertLocal,
    alterarLocal,
    apagarLocal
} = require('../models/LocalModel')

async function getLocaispBloco(req, res) {
    try {
        if (!req.params.bloco || req.params.bloco === 'nulo') {
            return res.json({ msg: 'sem alterações.' })
        }
        let locais = await getLocaisByBloco(req.params.bloco)
        return res.json({ locais: locais })
    } catch (err) {
        return res.status(err.cause || 500).json({ msg: err.message })
    }
}

async function getLocais(req, res) {
    try {
        let { q, pag } = req.query
        if (q && q.trim() !== '') {
            let locais = await pesquisarLocais(q.trim())
            return res.status(200).json({ locais: locais })
        }
        let locais = await getAllLocais(100, 'DESC', pag || 1)
        return res.status(200).json({ locais: locais })
    } catch (err) {
        return res.status(err.cause || 500).json({ msg: err.message })
    }
}

async function getBlocos(req, res) {
    try {
        let blocos = await getAllBlocos()
        return res.status(200).json({ blocos: blocos })
    } catch (err) {
        return res.status(err.cause || 500).json({ msg: err.message })
    }
}

async function postLocal(req, res) {
    try {
        let { bloco, local, nome } = req.body
        let nomeFinal = nome || local

        if (!bloco || !nomeFinal) {
            return res.status(400).json({ msg: 'Preencha o bloco e o nome do local.' })
        }

        let novoLocal = await insertLocal(bloco, nomeFinal)
        return res.status(201).json({ msg: 'Local cadastrado com sucesso!', local: novoLocal })
    } catch (err) {
        return res.status(err.cause || 500).json({ msg: err.message })
    }
}

async function putLocal(req, res) {
    try {
        let id = parseInt(req.params.id)
        let { local, nome, bloco } = req.body
        let nomeFinal = nome || local

        if (!id || isNaN(id)) {
            return res.status(422).json({ msg: 'ID não informado.' })
        }
        if (!bloco || !nomeFinal) {
            return res.status(400).json({ msg: 'Preencha o bloco e o nome do local.' })
        }

        let linhasAfetadas = await alterarLocal(id, nomeFinal, bloco)
        if (linhasAfetadas === 0) {
            return res.status(404).json({ msg: 'Local não encontrado.' })
        }

        return res.status(200).json({ msg: 'Local atualizado com sucesso!' })
    } catch (err) {
        return res.status(err.cause || 500).json({ msg: err.message })
    }
}

async function deleteLocal(req, res) {
    try {
        let id = parseInt(req.params.id)
        if (!id || isNaN(id)) {
            return res.status(422).json({ msg: 'ID não informado.' })
        }

        let linhasAfetadas = await apagarLocal(id)
        if (linhasAfetadas === 0) {
            return res.status(404).json({ msg: 'Local não encontrado.' })
        }

        return res.status(200).json({ msg: 'Local removido com sucesso!' })
    } catch (err) {
        return res.status(err.cause || 500).json({ msg: err.message })
    }
}

async function dynamicLocais(req, res) {
    try {
        if (!res.locals.user) {
            return res.redirect('/i/login')
        }
        let busca = req.query.q ? req.query.q.trim() : ''
        let pag = parseInt(req.query.pag) || 1
        if (pag < 1) {
            return res.redirect('/u/locais?pag=1')
        }

        let locs = busca !== '' ? await pesquisarLocais(busca) : await getAllLocais(7, 'DESC', pag)

        if (locs.length === 0 && pag > 1 && busca === '') {
            return res.redirect('/u/locais?pag=1')
        }

        if (res.locals.user.tipo === 'administrador') {
            return res.render('authNeeded/locais_registrados.ejs', {
                locs: locs,
                pag: pag,
                busca: busca,
                usuario: res.locals.user.email
            })
        } else {
            return res.render('authNeeded/locais_registrados_user.ejs', {
                locs: locs,
                pag: pag,
                busca: busca,
                usuario: res.locals.user.email
            })
        }
    } catch (err) {
        console.log(err)
        return res.redirect('/u/inicial')
    }
}

async function dynamicLocalCriacao(req, res) {
    try {
        if (!res.locals.user) {
            return res.redirect('/i/login')
        }
        return res.render('authNeeded/local.ejs', {
            usuario: res.locals.user.email
        })
    } catch (err) {
        console.log(err)
        return res.redirect('/u/inicial')
    }
}

async function dynamicLocalEdicao(req, res) {
    try {
        if (!res.locals.user) {
            return res.redirect('/i/login')
        }
        let id = parseInt(req.params.id)
        if (!id || isNaN(id)) {
            return res.redirect('/u/locais')
        }
        let loc = await pegarLocal(id)
        return res.render('authNeeded/local_edit.ejs', {
            usuario: res.locals.user.email,
            loc: loc
        })
    } catch (err) {
        console.log(err)
        return res.redirect('/u/locais')
    }
}

module.exports = {
    getLocaispBloco,
    getLocais,
    getBlocos,
    postLocal,
    putLocal,
    deleteLocal,
    dynamicLocais,
    dynamicLocalCriacao,
    dynamicLocalEdicao
}