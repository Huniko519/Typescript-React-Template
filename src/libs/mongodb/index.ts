import mongoose, { ConnectOptions } from 'mongoose'
import { getLogger } from 'log4js'

const logger = getLogger(__filename)

export async function initializeMongoDBClient({ uri, options }: { uri: string; options: ConnectOptions }) {
  const db = mongoose.connection
  db.on('connecting', () => {
    logger.info('connecting to MongoDB...')
  })
  db.on('error', (error) => {
    logger.info(`connection error: ${error}`)
    mongoose.disconnect()
  })
  db.on('connected', () => {
    logger.info('MongoDB connected!')
  })
  db.once('open', () => {
    logger.info('MongoDB connection opened!')
  })
  db.on('reconnected', () => {
    logger.info('MongoDB reconnected!')
  })
  db.on('disconnected', async () => {
    logger.info('MongoDB disconnected!')
    await mongoose.connect(uri, options)
  })
  await mongoose.connect(uri, options)
}
