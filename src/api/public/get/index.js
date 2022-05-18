const express = require('express')
const controller = require('./controller')

let router = new express.Router()

router.get('/item/:id', controller.getItem)
router.get('/model/:id', controller.getModel)
router.get('/gameData/:id', controller.getGameData)

module.exports = router
