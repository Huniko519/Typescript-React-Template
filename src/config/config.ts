import { ConnectOptions } from 'mongoose'
import { Configuration } from 'log4js'

export interface IMongooseConfig {
  uri: string
  options: ConnectOptions
  collections: any
  db: string
}

export interface IS3Config {
  region: string
  bucketName: string
  accessKeyID: string
  secretAccessKey: string
  baseURL: string
  dir: string
}

export interface SecretsManagerConfig {
  region: string
  secretId: string
  accessKeyId?: string
  secretAccessKey?: string
}

export interface IConfig {
  port: number
  mongodbConfig: IMongooseConfig
  loggingConfig: Configuration
  s3: IS3Config
  secretsManagerConfig: SecretsManagerConfig
  session_length: string
  session_salt: string
  secret: string
}
