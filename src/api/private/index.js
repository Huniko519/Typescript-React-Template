const express = require('express')

let router = new express.Router()

router.use('/posts', require('./post'))
router.use('/gets', require('./get'))

module.exports = router
