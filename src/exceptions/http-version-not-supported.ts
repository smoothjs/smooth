import { HttpStatus } from '../enums/http-status'
import { HttpException } from './http-exception'

export class HttpVersionNotSupportedException extends HttpException {
  constructor(
    message: string = 'HTTP Version Not Supported',
    code: string = 'ERR_HTTP_VERSION_NOT_SUPPORTED'
  ) {
    super(message, HttpStatus.HTTP_VERSION_NOT_SUPPORTED, code)
  }
}
