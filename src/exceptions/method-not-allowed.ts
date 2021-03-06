import { HttpStatus } from '../enums/http-status'
import { HttpException } from './http-exception'

export class MethodNotAllowedException extends HttpException {
  constructor(
    message: string = 'Method Not Allowed',
    code: string = 'ERR_HTTP_METHOD_NOT_ALLOWED'
  ) {
    super(message, HttpStatus.METHOD_NOT_ALLOWED, code)
  }
}
