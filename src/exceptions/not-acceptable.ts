import { HttpStatus } from '../enums/http-status'
import { HttpException } from './http-exception'

export class NotAcceptableException extends HttpException {
  constructor(message: string = 'Not Acceptable', code: string = 'ERR_NOT_ACCEPTABLE') {
    super(message, HttpStatus.NOT_ACCEPTABLE, code)
  }
}
