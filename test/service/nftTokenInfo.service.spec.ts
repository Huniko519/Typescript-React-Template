import '../base'
import { getLogger } from 'log4js'

import NftTokenInfoService from '../../src/services/nft/nftTokenInfo.service'

const logger = getLogger(__filename)

describe('NftTokenInfoService', () => {
  it('findByPage', async () => {
    const [tokenInfos, total] = await new NftTokenInfoService().findByPage({
      offset: 10,
      limit: 5,
      sortName: 'createdAt',
      sortBy: 'asc'
    })
    logger.info(total)
    logger.info(tokenInfos)
  })
})
