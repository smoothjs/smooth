import { HttpStatus } from '../enums/http-status'
import { HttpException } from './http-exception'

export class BadRequestException extends HttpException {
  constructor(message: string = 'Bad Request', code: string = 'ERR_BAD_REQUEST') {
    super(message, HttpStatus.BAD_REQUEST, code)
  }
}
