import { IConfig } from './config'
import LogConfig from './log/config.dev'

const config: IConfig = {
  port: 80,
  loggingConfig: LogConfig,
  mongodbConfig: {
    uri: ``,
    db: '',
    options: {
      tls: true,
      tlsCAFile: `${__dirname}/rds-combined-ca-bundle.pem`,
      tlsAllowInvalidHostnames: true,
      directConnection: true,
      replicaSet: 'rs0',
      readPreference: 'secondaryPreferred',
      retryWrites: false,
      authSource: 'admin',
      authMechanism: 'SCRAM-SHA-1',
      maxPoolSize: 5,
      minPoolSize: 1,
      maxIdleTimeMS: 30 * 60 * 1000,
      serverSelectionTimeoutMS: 60 * 1000,
      connectTimeoutMS: 60 * 100,
    },
    collections: {
      models: 'models',
      items: 'items',
      users: 'users',
    },
  },
  s3: {
    region: '',
    bucketName: '',
    accessKeyID: '',
    secretAccessKey: '',
    baseURL: '',
    dir: '',
  },
  secretsManagerConfig: {
    region: '',
    secretId: '',
    accessKeyId: '',
    secretAccessKey: '',
  },
  session_length: '3600000',
  session_salt: '$2a$10$z7ZyJfB5UjdU3eSFvCD.OO',
  secret: '821059535661b1c9b813510cf6d40c24',
}

export default config
