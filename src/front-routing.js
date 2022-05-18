const express = require('express')
const path = require('path')
const { Verify } = require('./utils/auth')
let router = new express.Router()

router.use(express.static('./res'))

router.get('/login', (req, res) => {
  res.sendFile(path.resolve('./res/html/login.html'))
})

router.use(Verify)

router.get('/', (req, res) => {
  res.redirect('/items')
})

router.get('/items', (req, res) => {
  res.sendFile(path.resolve('./res/html/update/items.html'))
})

router.get('/models', (req, res) => {
  res.sendFile(path.resolve('./res/html/update/models.html'))
})

router.get('/add/model', (req, res) => {
  res.sendFile(path.resolve('./res/html/add/model.html'))
})
router.get('/add/item', (req, res) => {
  res.sendFile(path.resolve('./res/html/add/item.html'))
})
router.get('/add/user', (req, res) => {
  res.sendFile(path.resolve('./res/html/add/user.html'))
})

router.get('/approve/models', (req, res) => {
  res.sendFile(path.resolve('./res/html/approve/models.html'))
})
router.get('/approve/items', (req, res) => {
  res.sendFile(path.resolve('./res/html/approve/items.html'))
})

module.exports = router
