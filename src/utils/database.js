const mongo = require('mongodb-3.6.4')
const express = require('express')
const gridfs = require('gridfs-stream')

import Config from '../config'

let router = new express.Router()
let database

function GetDatabase() {
  return new Promise((res, rej) => {
    mongo.MongoClient.connect(
      Config.mongodbConfig.uri,
      // Config.mongodbConfig.options,
      Object.assign(Config.mongodbConfig.options, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      (err, client) => {
        if (err) throw err

        let database = client.db(Config.mongodbConfig.db)

        res(database)
      },
    )
  })
}

router.use(async (req, res, next) => {
  if (!database) database = await GetDatabase()

  req.database = database

  for (let coll in Config.mongodbConfig.collections) {
    req[coll] = req.database.collection(Config.mongodbConfig.collections[coll])
    req[coll].exists = (query) => req[coll].count(query, { limit: 1 })
  }

  req.gfs = new gridfs(database, mongo)

  next()
})

module.exports = router
