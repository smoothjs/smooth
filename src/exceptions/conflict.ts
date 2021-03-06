import { HttpStatus } from '../enums/http-status'
import { HttpException } from './http-exception'

export class ConflictException extends HttpException {
  constructor(message: string = 'Conflict', code: string = 'ERR_CONFLICT') {
    super(message, HttpStatus.CONFLICT, code)
  }
}
