import { RuntimeException } from './runtime-exception'

export class InvalidExceptionFilterException extends RuntimeException {
  constructor() {
    super(`Invalid exception filters (@UseFilters()).`)
  }
}
