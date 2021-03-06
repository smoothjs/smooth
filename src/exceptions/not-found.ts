import { HttpStatus } from '../enums/http-status'
import { HttpException } from './http-exception'

export class NotFoundException extends HttpException {
  constructor(message: string = 'Not Found', code: string = 'ERR_ROUTE_NOT_FOUND') {
    super(message, HttpStatus.NOT_FOUND, code)
  }
}
