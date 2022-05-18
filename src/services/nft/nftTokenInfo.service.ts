import NftTokenInfoModel, { INftTokenInfo } from '../../models/nftTokenInfo.model'
import { FilterQuery } from 'mongoose'
import { Long } from 'mongodb'

export default class NftTokenInfoService {
  public async findByPage({
    network,
    address,
    tokenId,
    offset = 0,
    limit = 100,
    sortName,
    sortBy,
    status,
  }: {
    network?: string
    address?: string
    tokenId?: string
    offset?: number
    limit?: number
    sortName: string
    sortBy: string
    status?: number
  }): Promise<[INftTokenInfo[], number]> {
    const filter: FilterQuery<INftTokenInfo> = {}
    if (!status === undefined) {
      filter.status = status
    }
    if (network) {
      filter.network = network
    }
    if (address) {
      filter.address = address
    }
    if (tokenId) {
      filter.tokenId = Long.fromString(tokenId)
    }
    const tokenInfos = await NftTokenInfoModel.find(
      filter,
      {},
      {
        skip: offset,
        limit,
        sort: {
          [sortName]: sortBy,
        },
      },
    )
    const total = await NftTokenInfoModel.countDocuments(filter)
    return [tokenInfos, total]
  }
}
