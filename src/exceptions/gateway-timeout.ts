import { HttpStatus } from '../enums/http-status'
import { HttpException } from './http-exception'

export class GatewayTimeoutException extends HttpException {
  constructor(message: string = 'Gateway Timeout', code: string = 'ERR_GATEWAY_TIMEOUT') {
    super(message, HttpStatus.GATEWAY_TIMEOUT, code)
  }
}
