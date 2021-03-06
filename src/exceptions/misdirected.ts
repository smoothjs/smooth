import { HttpStatus } from '../enums/http-status'
import { HttpException } from './http-exception'

export class MisdirectedException extends HttpException {
  constructor(message: string = 'Misdirected', code: string = 'ERR_MISDIRECTED') {
    super(message, HttpStatus.MISDIRECTED, code)
  }
}
