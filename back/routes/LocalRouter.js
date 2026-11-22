const express = require('express')
const router = express.Router()
const {getLocaispBloco} = require('../controllers/LocalController')

router.get('/:bloco', getLocaispBloco)

module.exports = router