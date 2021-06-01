import { HttpException } from '../exceptions/http-exception'
import { InvalidExceptionFilterException } from '../exceptions/filter-exception'
import { ExceptionFilter, ExceptionFilterMetadata } from '../interfaces/exception-filter'
import { HttpAdapter } from '../server/base-adapter'
import { isEmpty, isObject, isUndefined } from '../utils'
import { Type } from '../interfaces/type'

export class ExceptionHandler implements ExceptionFilter {
  private filters: ExceptionFilterMetadata[] = []

  constructor(protected readonly httpServer: HttpAdapter) {}

  public setCustomFilters(filters: ExceptionFilterMetadata[]) {
    if (!Array.isArray(filters)) {
      throw new InvalidExceptionFilterException()
    }
    this.filters = filters
  }

  public catch(exception: any, response: any) {
    if (this.invokeCustomFilters(exception, response)) {
      return
    }

    if (!(exception instanceof HttpException)) {
      return this.handleUnknownError(exception, response)
    }

    const statusCode = exception.status || 500
    const message = {
      statusCode: statusCode,
      message: exception.message,
    }

    if (! isUndefined(exception.data)) {
      message['data'] = exception.data
    }

    this.httpServer.status(response, statusCode)
    this.httpServer.sendResponse(response, message)
  }

  public invokeCustomFilters(exception: any, response: any): boolean {
    if (isEmpty(this.filters)) {
      return false
    }
    const isInstanceOf = (metatype: Type<unknown>) => {
      return exception instanceof metatype
    }

    const filter = this.filters.find(({ exceptionMetatypes }) => {
      const typeExists = !exceptionMetatypes.length || exceptionMetatypes.some(isInstanceOf)
      return typeExists
    })

    filter && filter.func(exception, response)

    return !!filter
  }

  private handleUnknownError(exception: any, response: any) {
    const statusCode = 500
    const message = {
      statusCode: statusCode,
      message: `UNKNOWN_ERR: ${exception.constructor.name}`,
    }

    this.httpServer.status(response, statusCode)
    this.httpServer.sendResponse(response, message)
  }
}
