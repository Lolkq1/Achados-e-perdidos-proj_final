const express = require('express')
const router = express.Router()
let {dynamicSolicitacoes} = require('../controllers/SolicitacaoController')
router.get('/solicitacoes/:uid', dynamicSolicitacoes)
router.get('/solicitacoes/', dynamicSolicitacoes)
module.exports = router