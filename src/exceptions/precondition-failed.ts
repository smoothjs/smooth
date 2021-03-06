import { HttpStatus } from '../enums/http-status'
import { HttpException } from './http-exception'

export class PreconditionFailedException extends HttpException {
  constructor(message: string = 'Precondition Failed', code: string = 'ERR_PRECONDITION_FAILED') {
    super(message, HttpStatus.PRECONDITION_FAILED, code)
  }
}
