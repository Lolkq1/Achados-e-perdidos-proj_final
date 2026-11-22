let {getLocaisByBloco} = require('../models/LocalModel')

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

module.exports = {getLocaispBloco}