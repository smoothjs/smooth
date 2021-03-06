import { HttpStatus } from '../enums/http-status'
import { HttpException } from './http-exception'

export class BadGatewayException extends HttpException {
  constructor(message: string = 'Bad Gateway', code: string = 'ERR_BAD_GATEWAY') {
    super(message, HttpStatus.BAD_GATEWAY, code)
  }
}
