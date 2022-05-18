import { Configuration } from 'log4js'

const CONFIG: Configuration = {
  appenders: {
    console: { type: 'console' },
  },
  categories: {
    default: { appenders: ['console'], level: 'debug' },
  },
  pm2: true,
  disableClustering: true,
}

export default CONFIG
