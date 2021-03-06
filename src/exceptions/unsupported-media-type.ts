import { HttpStatus } from '../enums/http-status'
import { HttpException } from './http-exception'

export class UnsupportedMediaTypeException extends HttpException {
  constructor(
    message: string = 'Unsupported Media Type',
    code: string = 'ERR_UNSUPPORTED_MEDIA_TYPE'
  ) {
    super(message, HttpStatus.UNPROCESSABLE_ENTITY, code)
  }
}
