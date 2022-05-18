const express = require('express')
const { Verify } = require('../utils/auth')

let router = new express.Router()

router.use('/public', require('./public'))

router.use(Verify) // Verify session for private routes
router.use('/private', require('./private'))

module.exports = router
