import NftTokenInfoService from '../../services/nft/nftTokenInfo.service'
import BaseResponse from '../../libs/response/baseResponse'
import { INftTokenInfo } from '../../models/nftTokenInfo.model'

export default class NftTokenInfoController {
  private static readonly nftTokenInfoService: NftTokenInfoService = new NftTokenInfoService()

  public static async getTokenInfos(req: any, resp: any) {
    const [tokenInfos, total] = await NftTokenInfoController.nftTokenInfoService.findByPage(req)
    resp.json(
      BaseResponse.SUCCESS.clone().setData({
        count: total,
        list: tokenInfos.map((tokenInfo: INftTokenInfo) => ({
          network: tokenInfo.network,
          address: tokenInfo.address,
          tokenId: tokenInfo.tokenId.toNumber(),
          createdAt: tokenInfo.createdAt.getTime(),
          creator: tokenInfo.creator,
          owner: tokenInfo.owner,
          amountTraded: tokenInfo.amountTraded.toString(),
          volumeTraded: tokenInfo.volumeTraded.toString(),
          blockCreateTime: tokenInfo.blockCreateTime.toNumber(),
          lastTransferTime: tokenInfo.lastListTime.toNumber(),
          lastListTime: tokenInfo.lastListTime.toNumber(),
          lastTradeTime: tokenInfo.lastListTime.toNumber(),
          animationUrl: tokenInfo.animationUrl,
          attributes: tokenInfo.attributes,
          backgroundColor: tokenInfo.backgroundColor,
          description: tokenInfo.description,
          imageUrl: tokenInfo.imageUrl,
          name: tokenInfo.name,
        })),
      }),
    )
  }
}
