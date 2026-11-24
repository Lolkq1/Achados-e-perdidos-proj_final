let {
    getLocaisByBloco,
    createLocal,
    getAllLocais,
    updateLocal,
    deleteLocal
} = require('../models/LocalModel')


async function getLocaispBloco(req, res) {
    try {
        if (!req.params.bloco || req.params.bloco === 'nulo') {
            return res.json({ msg: 'sem alterações.' })
        }
        let bloco = req.params.bloco
        let locais = await getLocaisByBloco(bloco)
        return res.json({ locais: locais })
    } catch (err) {
        return res.status(err.cause || 500).json({ msg: err.message })
    }
}

async function listarLocais(req, res) {
    try {
        let locais = await getAllLocais()
        return res.status(200).json({ locais: locais })
    } catch (err) {
        return res.status(err.cause || 500).json({ msg: err.message })
    }
}

async function criarLocal(req, res) {
    try {
        let { bloco, nome } = req.body

        if (!bloco || !nome) {
            return res.status(400).json({ msg: 'Preencha o bloco e o nome do local.' })
        }

        let novoLocal = await createLocal(bloco, nome)
        return res.status(201).json({ msg: 'Local cadastrado com sucesso!', local: novoLocal })
    } catch (err) {
        return res.status(err.cause || 500).json({ msg: err.message })
    }
}

async function atualizarLocal(req, res) {
    try {
        let id = req.params.id
        let { bloco, nome } = req.body

        if (!bloco || !nome) {
            return res.status(400).json({ msg: 'Preencha o bloco e o nome do local.' })
        }

        let linhasAfetadas = await updateLocal(id, bloco, nome)

        if (linhasAfetadas === 0) {
            return res.status(404).json({ msg: 'Local não encontrado.' })
        }

        return res.status(200).json({ msg: 'Local atualizado com sucesso!' })
    } catch (err) {
        return res.status(err.cause || 500).json({ msg: err.message })
    }
}

async function deletarLocal(req, res) {
    try {
        let id = req.params.id
        let linhasAfetadas = await deleteLocal(id)

        if (linhasAfetadas === 0) {
            return res.status(404).json({ msg: 'Local não encontrado.' })
        }

        return res.status(200).json({ msg: 'Local excluído com sucesso!' })
    } catch (err) {
        return res.status(err.cause || 500).json({ msg: err.message })
    }
}

module.exports = {
    getLocaispBloco,
    listarLocais,
    criarLocal,
    atualizarLocal,
    deletarLocal
}