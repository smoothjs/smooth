import { HttpStatus } from '../enums/http-status'
import { HttpException } from './http-exception'

export class InternalServerErrorException extends HttpException {
  constructor(
    message: string = 'Internal Server Error',
    code: string = 'ERR_INTERNAL_SERVER_ERROR'
  ) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, code)
  }
}
