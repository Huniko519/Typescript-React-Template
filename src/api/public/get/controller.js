let ObjectID = require('mongodb').ObjectId

const getItem = async (req, res) => {
  try {
    let item = await req.items.findOne({ _id: new ObjectID(req.params.id) }).pretty()

    if (!item) return res.status(400).send('Didnt find item with given ID')

    return res.status(200).send(item)
  } catch (err) {
    return res.status(400).send('Invalid ID')
  }
}

const getModel = async (req, res) => {
  try {
    let item = await req.models.findOne({ _id: new ObjectID(req.params.id) })

    if (!item) return res.status(400).send('Didnt model item with given ID')

    return res.status(200).send(item)
  } catch (err) {
    return res.status(400).send('Invalid ID')
  }
}

const getGameData = async (req, res) => {
  try {
    let item = await req.items.findOne({ _id: new ObjectID(req.params.id) })

    if (!item) return res.status(400).send('Didnt find item with given ID')

    let model = await req.models.findOne({ _id: new ObjectID(item.gameData.model) })

    if (!model) return res.status(400).send('Didnt find model with given ID')

    delete model.user
    delete model.approved
    delete model.approvedDate
    delete model.createdTime

    let gameData = {
      data: item.gameData,
      mesh: model,
    }

    return res.status(200).send(gameData)
  } catch (err) {
    return res.status(400).send('Invalid ID')
  }
}

module.exports = {
  getItem,
  getModel,
  getGameData,
}
