const express = require('express')
const router = express.Router()
let {dynamicUsersEdicao, dynamicUsers} = require('../controllers/UserController')
router.get('/usuario/:uid', dynamicUsersEdicao)
router.get('/usuarios/', dynamicUsers)
router.get('/usuarioedit/:id', dynamicUsersEdicao)
module.exports = router