/*
 * @description error messages
 */
import ErrorCode from './errorCode'

interface IErrorMsg {
  [propName: number]: {
    [propName: string]: string
  }
}

const ErrorMsg: IErrorMsg = {
  [ErrorCode.BASE.SUCCESS]: {
    en: 'success',
  },
  [ErrorCode.BASE.FAILED]: {
    en: 'Request failed, please try again later',
  },
  [ErrorCode.BASE.SERVER_ERROR]: {
    en: 'System error',
  },
  [ErrorCode.BASE.SYSTEM_MAINTENANCE]: {
    en: 'This operation cannot be performed during system maintenance',
  },
  [ErrorCode.BASE.UNKNOWN_ERROR]: {
    en: 'Unknown error',
  },
  [ErrorCode.BASE.INVALID_PARAMS]: {
    en: 'Incorrect request parameter',
  },
  [ErrorCode.BASE.NOT_FOUND]: {
    en: 'Not Found',
  },
  [ErrorCode.BASE.REQUEST_TIMEOUT]: {
    en: 'Request time out',
  },
}

export default ErrorMsg
