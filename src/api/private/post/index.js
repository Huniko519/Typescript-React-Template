const express = require('express')
const checkers = require.main.require('./utils/utils')
const multer = require.main.require('./utils/multer')

const controller = require('./controller')

let router = new express.Router()

router.use(checkers.user)
router.post('/uploadItem', multer.item, controller.uploadItem)
router.post('/uploadModel', multer.model, controller.uploadModel)

router.post('/updateModel', multer.model, controller.updateModel)

router.use(checkers.manager)
router.post('/approveItem', controller.approveItem)
router.post('/approveModel', controller.approveModel)

router.use(checkers.admin)
router.post('/addUser', multer.text, controller.addUser)

module.exports = router
