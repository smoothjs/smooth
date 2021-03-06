import { HttpStatus } from '../enums/http-status'
import { HttpException } from './http-exception'

export class NotImplementedException extends HttpException {
  constructor(message: string = 'Not Implemented', code: string = 'ERR_NOT_IMPLEMENTED') {
    super(message, HttpStatus.NOT_IMPLEMENTED, code)
  }
}
