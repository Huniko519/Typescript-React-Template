const S3 = require('aws-sdk/clients/s3')

const fs = require('fs')
import Config from '../config'

const s3 = new S3({
  region: Config.s3.region,
  accessKeyId: Config.s3.accessKeyID,
  secretAccessKey: Config.s3.secretAccessKey,
})

let uploadFile = (file, dest) => {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: Config.s3.bucketName,
    Body: fileStream,
    Key: dest + file.filename,
  }

  return s3.upload(uploadParams).promise()
}

let deleteFile = (key) => {
  let params = {
    Bucket: Config.s3.bucketName,
    Key: key,
  }

  return s3.deleteObject(params).promise()
}

let destination = {
  model: 'Game/models/',
  item: 'Game/items/',
}

module.exports = {
  uploadFile,
  deleteFile,
  destination,
  baseURL: Config.s3.baseURL,
}
