const express = require('express')
const router = express.Router()
let {dynamicUserEditar, dynamicUser} = require('../controllers/UserController')
router.get('/users/:uid', dynamicUser)
router.get('/users/', dynamicUser)
router.get('/useredit/:id', dynamicUserEditar)
module.exports = router