import DevConfig from './config.dev'
import ProdConfig from './config.prod'
import TestConfig from './config.test'
import { IConfig } from './config'

const env = process.env.NODE_ENV || 'develop'
let Config: IConfig = DevConfig
switch (env) {
  case 'production': {
    Config = ProdConfig
    break
  }
  case 'test': {
    Config = TestConfig
    break
  }
}
export default Config
