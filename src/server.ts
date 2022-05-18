import './utils/base'
import log4js from 'log4js'
import Config from './config'
import { initializeMongoDBClient } from './libs/mongodb'
import routers from './routers/router'
const express = require('express')
const cookie_parser = require('cookie-parser')
const cors = require('cors')

const database = require('./utils/database.js')
const front = require('./front-routing.js')
const apiRoutes = require('./api')

log4js.configure(Config.loggingConfig)
const logger = log4js.getLogger(__filename)

process.on('uncaughtException', (err) => {
  logger.error('Caught uncaughtException: ', err)
})

process.on('unhandledRejection', (reason: any, p) => {
  logger.error(`Caught unhandledRejection at: ${p}, reason: ${reason && reason.stack}`)
})

export default async function initialize() {
  const server = express()
  await initializeMongoDBClient(Config.mongodbConfig)

  server.use(cookie_parser())
  server.use(express.json())
  server.use(cors())

  server.use(routers)

  server.use(database)

  server.use('/api', apiRoutes)
  server.use(front)

  server.use((req: any, res: any) => {
    res.status(404).send('This endpoint was not found')
  })

  server.listen(Config.port)
}
