/*
 * @description base response
 */
import ErrorMsg from './errorMsg'
import ErrorCode from './errorCode'

export default class BaseResponse {
  private code: number
  private msg: string
  private data?: any
  private timestamp: number
  private static readonly defaultLanguage: string = 'en'
  public static SUCCESS: BaseResponse = BaseResponse.create(ErrorCode.BASE.SUCCESS)

  constructor(code: number, msg?: string, data?: any) {
    this.code = typeof code === 'number' ? code : ErrorCode.BASE.UNKNOWN_ERROR
    this.msg = msg || (ErrorMsg[this.code] && ErrorMsg[this.code]['en']) || 'Unknown error'
    this.data = data
    this.timestamp = Date.now()
  }

  public static create(code: number, msg?: string, data?: any) {
    return new BaseResponse(code, msg, data)
  }

  public clone() {
    return new BaseResponse(this.code, this.msg, this.data)
  }

  public setLanguage(language = 'en') {
    this.msg =
      (ErrorMsg[this.code] && (ErrorMsg[this.code][language] || ErrorMsg[this.code][BaseResponse.defaultLanguage])) ||
      this.msg
    return this
  }

  public setCode(code: number) {
    this.code = code
    return this
  }

  public getCode() {
    return this.code
  }

  public setMsg(msg: string) {
    this.msg = msg
    return this
  }

  public getMsg() {
    return this.msg
  }

  public setData(data: any) {
    this.data = data
    return this
  }

  public getData() {
    return this.data
  }

  public setTimestamp(timestamp: number) {
    this.timestamp = timestamp
    return this
  }
}
