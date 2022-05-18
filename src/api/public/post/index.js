const express = require('express')
const { Login, Register, TestAddAdmin } = require('../../../utils/auth')

let router = new express.Router()

router.post('/login', Login)
// router.post('/register', Register);
router.get('/TestAddAdmin', TestAddAdmin)

module.exports = router
