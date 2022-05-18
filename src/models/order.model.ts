import mongoose, { Schema, Document } from 'mongoose'
import mongooseLong from 'mongoose-long'
mongooseLong(mongoose)

export interface IOrder extends Document {
  id: string // order ID
  nftAddress: string
  assetId: string // asset id or project id
  payToken: string
  price: string
  amount: string
  seller: string
  createdAt: Date
  updatedAt: Date
}

const OrderSchema: Schema = new Schema(
  {
    id: { type: Schema.Types.Long, required: true, unique: true },
    nftAddress: { type: String, required: true },
    assetId: { type: Schema.Types.Long, required: true },
    payToken: { type: String, required: true },
    price: { type: Schema.Types.Number },
    amount: { type: Schema.Types.Long },
    seller: { type: String, required: true },
  },
  { timestamps: true },
)

export default mongoose.model<IOrder>('order', OrderSchema)
