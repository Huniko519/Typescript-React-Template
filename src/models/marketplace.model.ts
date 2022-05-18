import mongoose, { Schema, Document } from 'mongoose'
import mongooseLong from 'mongoose-long'
mongooseLong(mongoose)

export interface IMarketPlace extends Document {
  id: number
  lastBlockNumber: number
  listenerBlocks: number[]
}

const MarketPlaceSchema: Schema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    lastBlockNumber: { type: Number, default: 0 },
    listenerBlocks: { type: Array, default: [] },
  },
  { timestamps: true },
)

export default mongoose.model<IMarketPlace>('market_place', MarketPlaceSchema)
