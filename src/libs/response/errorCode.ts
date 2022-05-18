/**
 * @description error code
 */
interface IErrorCode {
  [propName: string]: {
    [propName: string]: number
  }
}

const ErrorCode: IErrorCode = {
  BASE: {
    SUCCESS: 0,
    FAILED: 1,
    SERVER_ERROR: 500,
    SYSTEM_MAINTENANCE: 503,
    UNKNOWN_ERROR: 505,
    INVALID_PARAMS: 400,
    NOT_FOUND: 404,
    REQUEST_TIMEOUT: 1001,
  },
}

export default ErrorCode
