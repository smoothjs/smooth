import { RequestHeader } from '../interfaces/header'
import { Redirect } from '../interfaces/redirect'
import { HttpAdapter } from '../server/base-adapter'
import { isEmpty, isFunction, isUndefined } from '../utils'

export class RouterResponseController {
  constructor(private readonly httpServer: HttpAdapter) {}

  public async setHeaders<IResponse = any>(response: IResponse, headers: RequestHeader[]) {
    headers.forEach((header: RequestHeader) => {
      this.httpServer.setHeader(response, header.name, header.content)
    })
  }

  public async applyRedirect<IResponse = any>(response: IResponse, redirectObj: Redirect) {
    if (!isEmpty(redirectObj)) {
      this.httpServer.redirect(response, redirectObj.statusCode, redirectObj.url)
    }
  }

  public async applyStatusCode<IResponse = any>(response: IResponse, statusCode: number) {
    if (!isUndefined(statusCode) && !Array.isArray(statusCode)) {
      this.httpServer.status(response, statusCode)
    }
  }

  public async setView<IResponse = any, IInput = unknown>(
    response: IResponse,
    template: string,
    result: IInput
  ) {
    if (!isEmpty(template)) {
      this.httpServer.render(response, template, this.transformToResult(result))
    }
  }

  private transformToResult(resultOrDeferred: any) {
    if (resultOrDeferred && isFunction(resultOrDeferred.subscribe)) {
      return resultOrDeferred.toPromise()
    }
    return resultOrDeferred
  }
}
