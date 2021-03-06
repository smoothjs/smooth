import { HttpStatus } from '../enums/http-status'
import { HttpException } from './http-exception'

export class ServiceUnavailableException extends HttpException {
  constructor(message: string = 'Service Unavailable', code: string = 'ERR_SERVICE_UNAVAILABLE') {
    super(message, HttpStatus.SERVICE_UNAVAILABLE, code)
  }
}
