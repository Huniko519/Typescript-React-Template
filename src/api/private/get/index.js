const express = require('express')

const checkers = require.main.require('./utils/utils')
const controller = require('./controller')

let router = new express.Router()

router.use(checkers.user)
router.get('/me', controller.getUserData)
router.get('/getMyItems', controller.getMyItems)
router.get('/getMyModels', controller.getMyModels)
router.get('/getCharacters', controller.getCharacters)
router.get('/getModelTypes', controller.getModelTypes)
router.get('/getCSVData', controller.getCSVData)

router.use(checkers.manager)
router.get('/unApprovedItems', controller.getUnApprovedItems)
router.get('/unApprovedModels', controller.getUnApprovedModels)

module.exports = router
