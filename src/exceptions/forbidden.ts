import { HttpStatus } from '../enums/http-status'
import { HttpException } from './http-exception'

export class ForbiddenException extends HttpException {
  constructor(message: string = 'Forbidden', code: string = 'ERR_FORBIDDEN') {
    super(message, HttpStatus.FORBIDDEN, code)
  }
}
