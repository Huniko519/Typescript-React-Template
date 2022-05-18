import AWS from 'aws-sdk'
import Config from '../../config'
// import { deepFreeze } from '../../utils/objectUtil'
import { SecretsManagerConfig } from '../../config/config'

const SECRET_KEYS_MAP = {
  // mongodb
  'mongodb-uri': ['mongodbConfig', 'uri'],
  // aws s3
  's3-region': ['s3', 'region'],
  's3-bucket': ['s3', 'bucketName'],
  's3-dir': ['s3', 'dir'],
  's3-access-key-id': ['s3', 'accessKeyID'],
  's3-secret-access-key': ['s3', 'secretAccessKey'],
  's3-base-url': ['s3', 'baseURL'],
}

export default class SecretsManager {
  static getSecretConfig({ region, secretId, accessKeyId, secretAccessKey }: SecretsManagerConfig): Promise<any> {
    return new Promise((resolve, reject) => {
      new AWS.SecretsManager({
        region,
        accessKeyId,
        secretAccessKey,
      }).getSecretValue({ SecretId: secretId }, (err, data) => {
        if (err) return reject(err)
        return resolve(JSON.parse(data.SecretString || '{}'))
      })
    })
  }

  static async loadSecretConfig() {
    const secretConfig = await SecretsManager.getSecretConfig(Config.secretsManagerConfig)
    Object.keys(secretConfig).forEach((key) => {
      // @ts-ignore
      const keys = SECRET_KEYS_MAP[key]
      if (!keys) return
      let config = Config
      while (keys.length > 1) {
        const nowKey = keys.shift()
        // @ts-ignore
        config[nowKey] = config[nowKey] || {}
        // @ts-ignore
        config = config[nowKey]
      }
      // @ts-ignore
      const originalValue = config[keys[0]]
      switch (typeof originalValue) {
        case 'number': {
          secretConfig[key] = Number(secretConfig[key])
          break
        }
        case 'boolean': {
          secretConfig[key] = !!Number(secretConfig[key])
          break
        }
        default:
      }
      // @ts-ignore
      config[keys[0]] = secretConfig[key]
    })
    if (process.env.MONGO_PROXY_URL) {
      Config.mongodbConfig.uri = process.env.MONGO_PROXY_URL
      Config.mongodbConfig.options.tlsAllowInvalidHostnames = true
      Config.mongodbConfig.options.directConnection = true
    }
    // deepFreeze(Config)
  }
}
