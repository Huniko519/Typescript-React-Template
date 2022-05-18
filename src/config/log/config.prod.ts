import { Configuration } from 'log4js'

const CONFIG: Configuration = {
  appenders: {
    console: {
      type: 'console',
      layout: {
        type: 'basic',
      },
    },
  },
  categories: {
    default: { appenders: ['console'], level: 'info' },
  },
  pm2: true,
  disableClustering: true,
}

export default CONFIG
