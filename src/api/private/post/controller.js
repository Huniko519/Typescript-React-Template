const s3 = require.main.require('./utils/s3')
const checkers = require.main.require('./utils/utils')
const converter = require.main.require('./utils/fbxconverter')

const fs = require('fs')
let ObjectID = require('mongodb').ObjectId

const uploadItem = async (req, res) => {
  try {
    let data = await req.models.findOne({ _id: new ObjectID(req.body.model) })

    if (!data) {
      return res.status(400).send('Model with given ID doesnt exists')
    }
  } catch (ex) {
    return res.status(400).send('Something went wrong.' + ex)
  }

  let textures = {}
  console.log(req.body)

  for (const file in req.files) {
    let s3File = await s3.uploadFile(req.files[file][0], s3.destination.item)
    textures[file] = {
      location: s3.baseURL + s3File.Key,
      key: s3File.Key,
    }

    await fs.unlinkSync(req.files[file][0].path)
  }

  let material = JSON.parse(JSON.stringify(req.body))
  delete material.name
  delete material.description
  delete material.model

  let gameData = {
    changeBodyTexture: false,
    textures: textures,
    material: material,
    model: req.body.model,
  }

  //Need to see from game side what i need from data
  let item = {
    user: req.user._id,
    creationDate: Date.now(),
    approvedDate: -1,
    mintedDate: -1,
    approved: false,
    minted: false,
    gameData: gameData,
    name: req.body.name,
    description: req.body.description,
  }

  try {
    await req.items.insert(item)
    return res.status(200).send('OK')
  } catch {
    return res.status(400).send('Something went wrong with saving item')
  }
}

const uploadModel = async (req, res, next) => {
  if (!req.file || Object.keys(req.file).length == 0) return res.status(400).send('You didnt provde the model file!')

  let convert = await converter(req.file.path)

  req.file.path = convert

  let uploadS3 = await s3.uploadFile(req.file, s3.destination.model)

  await fs.unlinkSync(convert)

  let model = {
    user: req.user._id,
    name: req.body.name,
    type: req.body.type,
    character: req.body.character,
    key: uploadS3.Key,
    path: s3.baseURL + uploadS3.Key,
    createdTime: Date.now(),
    approved: false,
    approvedDate: -1,
  }

  try {
    await req.models.insert(model)
    return res.status(200).send('Done, model uploaded.')
  } catch {
    return res.status(400).send('Something went wrong with saving item')
  }
}

const updateModel = async (req, res) => {
  try {
    let data = await req.models.findOne({ _id: new ObjectID(req.body.id) })

    if (!data) {
      return res.status(400).send('Model with given ID doesnt exists')
    }

    //We dont need for demo
    // if(data.user.localCompare(req.user._id) !== 0){
    //     return res.status(400).send("Model doesnt belong to you.");
    // }

    let convert = await converter(req.file.path)

    req.file.path = convert

    let uploadS3 = await s3.uploadFile(req.file, s3.destination.model)

    await fs.unlinkSync(convert)

    let deleteS3 = await s3.deleteFile(data.key)

    let querry = { _id: new ObjectID(req.params.id) }
    let updated = {
      $set: {
        path: s3.baseURL + uploadS3.Key,
        key: uploadS3.Key,
      },
    }

    let update = await req.models.updateOne(querry, updated).pretty()

    return res.status(200).send('Model updated...')
  } catch {
    return res.status(400).send('Something went wrong...')
  }
}

const updateItem = async (req, res) => {
  try {
    let data = await req.items.findOne({ _id: new ObjectID(req.body.id) })

    if (!data) {
      return res.status(400).send('Item with given ID doesnt exists')
    }

    let textures = JSON.parse(JSON.stringify(data.gameData.textures))

    for (const file in req.files) {
      s3.deleteFile(textures[file].key)

      let s3File = await s3.uploadFile(req.files[file][0], s3.destination.item)
      textures[file] = {
        location: s3.baseURL + s3File.Key,
        key: s3File.Key,
      }

      await fs.unlinkSync(req.files[file][0].path)
    }

    let material = JSON.parse(JSON.stringify(req.body))
    delete material.name
    delete material.description
    delete material.model

    let gameData = JSON.parse(JSON.parse(JSON.stringify(data.gameData)))
    gameData.textures = textures
    gameData.material = material

    let querry = { _id: new ObjectID(req.params.id) }
    let updated = {
      $set: {
        gameData: gameData,
      },
    }

    let update = await req.items.updateOne(querry, updated).pretty()

    return res.status(200).send('Model updated...')
  } catch {
    return res.status(400).send('Something went wrong...')
  }
}

const approveItem = async (req, res) => {
  //We dont need for demo
}
const approveModel = async (req, res) => {
  //We dont need for demo
}

const addUser = async (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.premissions)
    return res.status(400).send('Missing data submited!')

  try {
    let user = await req.users.findOne({ username: req.body.username })

    if (user) {
      return res.status(400).send('User with that username already exists')
    }
  } catch {
    return res.status(400).send('Something went wrong...')
  }

  require.main.require('./utils/auth').AddUser(req, res)
}

module.exports = {
  uploadItem,
  uploadModel,
  updateModel,
  updateItem,
  approveItem,
  approveModel,
  addUser,
}
