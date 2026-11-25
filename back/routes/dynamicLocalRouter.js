const express = require('express')
const router = express.Router()
let {dynamicLocais, dynamicLocalCriacao, dynamicLocalEdicao} = require('../controllers/LocalController')
router.get('/locais/', dynamicLocais)
router.get('/local/', dynamicLocalCriacao)
router.get('/localedit/:id', dynamicLocalEdicao)
module.exports = router