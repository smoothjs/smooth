import { HttpStatus } from '../enums/http-status'
import { HttpException } from './http-exception'

export class UnprocessableEntityException extends HttpException {
  constructor(message: string = 'Unprocessable Entity', code: string = 'ERR_UNPROCESSABLE_ENTITY') {
    super(message, HttpStatus.UNPROCESSABLE_ENTITY, code)
  }
}
