import { IController } from '../interfaces/base-controller'
import { RoutesResolver } from '../routes/resolver'
import { HttpAdapter } from './base-adapter'
import { RequestMiddleware } from '../interfaces'

export class Ignitor {
  private readonly routesResolver: RoutesResolver

  constructor(private module: IController, private httpServer: HttpAdapter, private options?: any) {
    this.routesResolver = new RoutesResolver(this.httpServer, this.module)
  }

  public async create() {
    await this.httpServer.initHttpServer(this.options)

    await this.useBodyParser()
    await this.registerGlobalMiddlewares()
    await this.registerRouters()
    await this.registerNotFoundHandler()
    await this.registerExceptionHandler()

    return this.createAdapterProxy()
  }

  private async registerGlobalMiddlewares() {
    const middlewares: RequestMiddleware[] = this.module.middlewares || []

    middlewares.forEach((middleware) => {
      if (!middleware.middleware[middleware.propertyKey || 'handle']) {
        return
      }

      this.httpServer.use(middleware.middleware[middleware.propertyKey || 'handle'])
    })
  }

  private async registerRouters(): Promise<void> {
    this.routesResolver.resolve(this.options && this.options.basePath ? this.options.basePath : '/')
  }

  private async registerExceptionHandler() {
    this.routesResolver.registerExceptionHandler()
  }

  private async registerNotFoundHandler() {
    this.routesResolver.registerNotFoundHandler()
  }

  private async useBodyParser() {
    if (this.options && this.options.bodyParser !== false) {
      this.httpServer.useBodyParser()
    }
  }

  private createAdapterProxy() {
    const adapter = this.httpServer

    const proxy = new Proxy(adapter, {
      get: (receiver: Record<string, any>, prop: string) => {
        if (!(prop in receiver) && prop in adapter) {
          return (...args: unknown[]) => {
            return proxy
          }
        }
        if (typeof receiver[prop] === 'function') {
          const mapToProxy = (result: unknown) => (result instanceof HttpAdapter ? proxy : result)

          return (...args: unknown[]) => {
            const result = receiver[prop](...args)
            return result instanceof Promise ? result.then(mapToProxy) : mapToProxy(result)
          }
        }

        return receiver[prop]
      },
    })

    return proxy as unknown
  }
}
