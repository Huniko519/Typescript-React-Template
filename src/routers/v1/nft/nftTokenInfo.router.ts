import express from 'express'
import NftTokenInfoController from '../../../controllers/nft/nftTokenInfo.controller'

const router = express.Router()

router.get('/nft/token-info', NftTokenInfoController.getTokenInfos)

export = router
