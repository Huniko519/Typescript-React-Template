import mongoose, { Schema, Document } from 'mongoose'
import mongooseLong from 'mongoose-long'
mongooseLong(mongoose)

export enum Status {
  DEFAULT = 0,
  ENABLE = 1,
  DISABLE = -1,
  DELETE = -10,
}

export interface INftContractInfo extends Document {
  network: string // rinkeby, solana-main
  address: string // contract address
  tokenType: string // ERC721、 ERC115
  creator: string // creator address
  name: string // name
  description: string // description
  totalSupply: string // total supply
  holders: string // holders
  floorPrice: string // floor price
  amountTraded: string // amount traded
  volumeTraded: string // volume traded
  status: number // status
  createdAt: Date
  updatedAt: Date
}

const nftContractInfoSchema: Schema = new Schema(
  {
    network: { type: String, required: true },
    address: { type: String, required: true },
    tokenType: { type: String, required: true },
    creator: { type: String, required: true },
    name: { type: String },
    description: { type: String },
    totalSupply: { type: Schema.Types.Long, default: 0 },
    holders: { type: Schema.Types.Long, default: 0 },
    floorPrice: { type: Schema.Types.Number, default: 0 }, // Decimal128 not support yet
    amountTraded: { type: Schema.Types.Long, default: 0 },
    volumeTraded: { type: Schema.Types.Number, default: 0 }, // Decimal128
    status: { type: Number, default: 0, enum: Status },
  },
  { timestamps: true },
)

nftContractInfoSchema.index(
  {
    network: 1,
    address: 1,
  },
  { unique: true },
)

export default mongoose.model<INftContractInfo>('nft_contract_info', nftContractInfoSchema)
