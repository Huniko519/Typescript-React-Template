import 'reflect-metadata'
import './utils/base'
import SecretsManager from './libs/aws/secretsManager'
import log4js from 'log4js'

const logger = log4js.getLogger(__filename)

async function bootstrap() {
  await SecretsManager.loadSecretConfig()
  const Server = await import('./server')
  // @ts-ignore
  await Server.default()
}

bootstrap()
  .then(async () => {
    logger.log('api started')
  })
  .catch(async (err) => {
    logger.error('start failed,', err)
    process.exit()
  })
