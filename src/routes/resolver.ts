import { HttpAdapter } from '../server/base-adapter'
import {
  addLeadingSlash,
  getMetadata,
  getMethods,
  isFunction,
  isHttpResponse,
  isNumeric,
  isUndefined,
  stripEndSlash,
} from '../utils'
import { RouterParamsFactory } from './params-factory'
import { RouterResponseController } from './response-controller'
import { NotFoundException } from '../exceptions/not-found'
import { ExceptionHandler } from '../http/exception-handler'
import { HookFunction } from '../hooks'
import { ExceptionFilterMetadata } from '../interfaces/exception-filter'
import { IController } from '../interfaces/base-controller'
import { Class } from '../interfaces/class'
import { RequestHeader } from '../interfaces/header'
import { Redirect } from '../interfaces/redirect'
import { RuntimeException } from '../exceptions'

export class RoutesResolver {
  private routerParamsFactory: RouterParamsFactory
  private routerResponseController: RouterResponseController
  private exceptionHandler: ExceptionHandler

  constructor(private readonly httpServer: HttpAdapter, private readonly baseModule: IController) {
    this.routerParamsFactory = new RouterParamsFactory()
    this.routerResponseController = new RouterResponseController(this.httpServer)
    this.exceptionHandler = new ExceptionHandler(this.httpServer)
  }

  public resolve(basePath: string) {
    this.baseModule.controllers.forEach((controller) => {
      let path = this.getControllerPathMetadata(controller)
      path = path ? basePath + path : basePath
      this.registerRouters(getMethods(controller), controller, path)
    })
  }

  public registerNotFoundHandler() {
    this.httpServer.use((req: any, res: any, next: () => void) => {
      const url = req.originalUrl.replace(/\?.*$/, '')
      const method = req.method.toUpperCase()

      this.exceptionHandler.catch(new NotFoundException(`Cannot ${method} ${url}`), res)
    })
  }

  public registerRouters(routes: any, controller: Class<unknown>, prefix: string) {
    routes.forEach((route) => {
      const method = this.getMethodMetadata(controller, route)

      if (!method) {
        return
      }

      const routerPaths = this.extractPath(controller, route, prefix)

      const router = this.httpServer.createMiddlewareFactory(method)

      this.registerHandler(
        router,
        routerPaths,
        this.getHooksMetadata(controller, route),
        async (req: any, res: any, next: () => void) => {
          await this.resolveRouterResult(controller, route, { req, res, next })
        }
      )
    })
  }

  private extractPath(
    controller: Class<unknown>,
    propertyKey: string,
    prefix: string = ''
  ): string[] {
    let path = getMetadata('ROUTE_PATH', controller, propertyKey)

    if (isUndefined(path)) {
      throw new RuntimeException(`Route path cannot be undefined. Method: ${propertyKey}, Class: ${controller.constructor.name}`)
    }

    if (Array.isArray(path)) {
      path = path.map((p) => prefix + stripEndSlash(p))
    } else {
      path = [prefix + stripEndSlash(path)]
    }

    return path.map((p) => addLeadingSlash(p))
  }

  private async resolveRouterResult<
    IRequest extends Record<string, any> = any,
    IResponse extends Record<string, any> = any
  >(
    controller: Class<unknown>,
    route: string,
    { req, res, next }: { req: IRequest; res: IResponse; next: Function }
  ) {
    try {
      const params = this.routerParamsFactory.getValuesFromArray(
        getMetadata('ROUTE_ARGS_METADATA', controller.constructor, route) || [],
        { req, res, next }
      )

      await this.routerResponseController.setHeaders(
        res,
        this.getHeadersMetadata(controller, route)
      )
      await this.routerResponseController.applyRedirect(
        res,
        this.getRedirectMetadata(controller, route)
      )
      await this.routerResponseController.applyStatusCode(
        res,
        this.getHttpStatusCodeMetadata(controller, route)
      )

      const response = await controller[route](...params)

      if (isHttpResponse(response, controller, route)) {
        res.send(isNumeric(response) ? `${response}` : response)
      }

      await this.routerResponseController.setView(
        res,
        this.getViewMetadata(controller, route),
        response
      )
    } catch (e) {
      this.exceptionHandler.setCustomFilters(this.getExceptionCustomFilter(controller, route))
      this.exceptionHandler.catch(e, res)
    }
  }

  private registerHandler(
    router: (...args: any[]) => void,
    path: string | string[],
    hooks: HookFunction[],
    proxy: (req: any, res: any, next: () => void) => void
  ) {
    router(path, hooks, proxy)
  }

  private getControllerPathMetadata(controller: Class<unknown>): string {
    return getMetadata('CONTROLLER_PATH', controller)
  }

  private getMethodMetadata(controller: Class<unknown>, propertyKey: string): string {
    return getMetadata('ROUTE_METHOD', controller, propertyKey)
  }

  private getHeadersMetadata(controller: Class<unknown>, propertyKey: string): RequestHeader[] {
    const routerHeaders = getMetadata('ROUTE_HEADERS', controller, propertyKey) || []
    const controllerHeaders = getMetadata('CONTROLLER_HEADERS', controller) || []

    return [...routerHeaders, ...controllerHeaders]
  }

  private getRedirectMetadata(controller: Class<unknown>, propertyKey: string): Redirect {
    return getMetadata('ROUTE_REDIRECT', controller, propertyKey) || {}
  }

  private getHttpStatusCodeMetadata(controller: Class<unknown>, propertyKey: string): number {
    return getMetadata('STATUS_CODE', controller, propertyKey) || []
  }

  private getViewMetadata(controller: Class<unknown>, propertyKey: string): string {
    return getMetadata('ROUTE_VIEW_TEMPLATE', controller, propertyKey)
  }

  private getHooksMetadata(controller: Class<unknown>, propertyKey: string): HookFunction[] {
    return getMetadata('HOOKS', controller, propertyKey) || []
  }

  private getExceptionCustomFilter(
    controller: Class<unknown>,
    propertyKey: string
  ): ExceptionFilterMetadata[] {
    const resolvedFilters: ExceptionFilterMetadata[] = []
    const filters: any[] = getMetadata('EXCEPTION_FILTERS', controller, propertyKey) || []

    filters.forEach((filter) => {
      resolvedFilters.push({
        func: isFunction(filter) ? filter : (filter as Record<string, any>).catch,
        exceptionMetatypes: getMetadata('EXCEPTION_METATYPES', filter.constructor) || []
      })
    })

    return resolvedFilters
  }
}
