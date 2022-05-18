import mongoose, { Schema, Document } from 'mongoose'
import { Long } from 'mongodb'
import mongooseLong from 'mongoose-long'
mongooseLong(mongoose)

export enum Status {
  DEFAULT = 0,
  ENABLE = 1,
  DISABLE = -1,
  UNKNOWN = -2,
  FAILED = -3,
  DELETE = -10,
}

export interface INftTokenInfo extends Document {
  network: string // rinkeby, solana-main
  address: string // contract address
  tokenId: Long
  creator: string // creator address
  owner: string // creator address
  name: string // name
  description: string // description
  imageUrl: string
  animationUrl: string
  backgroundColor: string
  attributes: object
  tokenURI: string
  amountTraded: Long // amount traded
  volumeTraded: string // volume traded
  blockCreateTime: Long //
  lastTransferTime: Long //
  lastListTime: Long //
  lastTradeTime: Long //
  errorMsg: string //
  status: number // status
  createdAt: Date
  updatedAt: Date
}

const nftTokenInfoSchema: Schema = new Schema(
  {
    network: { type: String, required: true },
    address: { type: String, required: true },
    tokenId: { type: Schema.Types.Long, required: true },
    creator: { type: String, required: true, default: '' },
    owner: { type: String, required: true, default: '' },
    name: { type: String },
    description: { type: String },
    imageUrl: { type: String },
    animationUrl: { type: String },
    backgroundColor: { type: String },
    attributes: { type: Schema.Types.Mixed },
    tokenURI: { type: String },
    amountTraded: { type: Schema.Types.Long, default: 0 },
    volumeTraded: { type: Schema.Types.Number, default: 0 },
    blockCreateTime: { type: Schema.Types.Long, default: 0 },
    lastTransferTime: { type: Schema.Types.Long, default: 0 },
    lastListTime: { type: Schema.Types.Long, default: 0 },
    lastTradeTime: { type: Schema.Types.Long, default: 0 },
    status: { type: Number, default: 0, enum: Status },
  },
  { timestamps: true },
)
nftTokenInfoSchema.index(
  {
    network: 1,
    address: 1,
    tokenId: 1,
  },
  { unique: true },
)

export default mongoose.model<INftTokenInfo>('nft_token_info', nftTokenInfoSchema)
