import { HttpStatus } from '../enums/http-status'
import { HttpException } from './http-exception'

export class PayloadTooLargeException extends HttpException {
  constructor(message: string = 'Payload Too Large', code: string = 'ERR_PAYLOAD_TOO_LARGE') {
    super(message, HttpStatus.PAYLOAD_TOO_LARGE, code)
  }
}
