const { DatabaseRequestHandler } = require.main.require('./utils/utils')

let ObjectID = require('mongodb').ObjectId

const getUserData = async (req, res) => {
  res.send(req.user)
}

const getUnApprovedItems = async (req, res) => {
  DatabaseRequestHandler(res, req.items, { approved: false })
}

const getUnApprovedModels = async (req, res) => {
  DatabaseRequestHandler(res, req.models, { approved: false })
}

const getMyItems = async (req, res) => {
  DatabaseRequestHandler(res, req.items, { user: new ObjectID(req.user._id) })
}

const getMyModels = async (req, res) => {
  DatabaseRequestHandler(res, req.models, { user: new ObjectID(req.user._id) })
}

const getCharacters = async (req, res) => {
  //TODO: Make system for adding new characters so it can be modular
  //Along the collection for those data.
  let characters = ['Male', 'Female']

  return res.status(200).send(characters)
}

const getModelTypes = async (req, res) => {
  //TODO: Make system for adding additional parts of boddy
  //For example : Head accesories, hand accesories etc...
  //Also database for them
  let types = ['Head', 'Eyes', 'Hair', 'Shirt', 'Dress', 'Leggins', 'Boots', 'Accesories']

  return res.status(200).send(types)
}

const getCSVData = async (req, res) => {
  try {
    let items = await req.items.find({ user: new ObjectID(req.user._id) }).toArray()

    let returnData = []

    for (let i = 0; i < items.length; i++) {
      let item = JSON.parse(JSON.stringify(items[i]))
      let model = await req.models.findOne({ _id: new ObjectID(items[i].gameData.model) })

      let data = {
        name: item.name,
        character: model.character,
        description: item.description,
        previewURL: item.gameData.textures.previewImg.location,
        type: model.type,
        modelURL: model.path,
        gameID: item._id,
      }

      returnData.push(data)
    }

    return res.status(200).send(returnData)
  } catch (err) {
    return res.status(400).send('Invalid ID')
  }
}

module.exports = {
  getUnApprovedItems,
  getUnApprovedModels,
  getCharacters,
  getModelTypes,
  getMyItems,
  getMyModels,
  getUserData,
  getCSVData,
}
