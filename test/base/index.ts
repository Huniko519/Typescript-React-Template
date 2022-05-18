import '../../src/utils/base'
import log4js from 'log4js'
import Config from '../../src/config'
import { initializeMongoDBClient } from '../../src/libs/mongodb'
log4js.configure(Config.loggingConfig)
const logger = log4js.getLogger(__filename)

const initialize = async () => {
  await initializeMongoDBClient(Config.mongodbConfig)
}

initialize()
  .then(() => {
    logger.info('init done')
  })
  .catch((err) => {
    logger.error('init error：', err)
    process.exit()
  })
