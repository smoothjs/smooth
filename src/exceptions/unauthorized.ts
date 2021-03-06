import { HttpStatus } from '../enums/http-status'
import { HttpException } from './http-exception'

export class UnauthorizedException extends HttpException {
  constructor(message: string = 'Unauthorized', code: string = 'ERR_UNAUTHORIZED') {
    super(message, HttpStatus.UNAUTHORIZED, code)
  }
}
