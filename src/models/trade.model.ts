import mongoose, { Schema, Document } from 'mongoose'
import mongooseLong from 'mongoose-long'
mongooseLong(mongoose)
export enum Types {
  CREATE = 'CREATE',
  EXECUTE = 'EXECUTE',
  CANCEL = 'CANCEL',
}
export interface ITrade extends Document {
  id: string // order ID
  eventType: Types
  seller: string
  buyer?: string
  createdAt: Date
  updatedAt: Date
}

const TradeSchema: Schema = new Schema(
  {
    id: { type: Schema.Types.Long, required: true },
    eventType: { type: String, required: true },
    nftAddress: { type: String },
    assetId: { type: Schema.Types.Long },
    payToken: { type: String },
    price: { type: Schema.Types.Number },
    amount: { type: Schema.Types.Long },
    seller: { type: String, required: true },
    buyer: { type: String },
  },
  { timestamps: true },
)

export default mongoose.model<ITrade>('trade', TradeSchema)
