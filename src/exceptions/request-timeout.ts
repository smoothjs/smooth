import { HttpStatus } from '../enums/http-status'
import { HttpException } from './http-exception'

export class RequestTimeoutException extends HttpException {
  constructor(message: string = 'Request Timeout', code: string = 'ERR_REQUEST_TIMEOUT') {
    super(message, HttpStatus.REQUEST_TIMEOUT, code)
  }
}
