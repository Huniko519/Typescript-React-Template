/*
 * @description s3 file upload
 */
import AWS from 'aws-sdk'
import { generateUuid } from '../../utils'
import Config from '../../config'

export default class S3FileUpload {
  private static instance: S3FileUpload
  private s3: AWS.S3

  constructor() {
    AWS.config.update({ region: Config.s3.region })
    this.s3 = new AWS.S3({
      apiVersion: '2008-10-17',
      credentials: null,
      accessKeyId: Config.s3.accessKeyID,
      secretAccessKey: Config.s3.secretAccessKey,
    })
  }

  static getInstance() {
    if (!S3FileUpload.instance) S3FileUpload.instance = new S3FileUpload()
    return S3FileUpload.instance
  }

  /**
   *
   * @param path save file path
   * @param suffix
   * @param validTime
   */
  async getPreSignature({ path = '', suffix = 'png', validTime = 1200 }) {
    let key = Config.s3.dir
    if (path) key = `${key}/${path}`
    key = `${key}/${generateUuid()}.${suffix}`
    const params = {
      Bucket: Config.s3.bucketName,
      Fields: { key },
      Expires: validTime,
      Conditions: [
        ['content-length-range', 0, 104857600], // 100 Mb
      ],
    }
    return new Promise(async (resolve, reject) => {
      this.s3.createPresignedPost(params, async (err, data) => {
        if (err) {
          console.error(err)
          reject(err)
          return
        }
        delete data.fields.bucket
        resolve(
          Object.assign(data, {
            fileUrl: `${Config.s3.baseURL}/${data.fields.key}`,
          }),
        )
      })
    })
  }
}
