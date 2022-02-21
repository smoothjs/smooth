import { join } from 'path'
import { Config } from '@smoothjs/config'
import { RoutesResolver } from '../routes/resolver'
import { HttpAdapter } from './base-adapter'
import { RequestMiddleware } from '../interfaces'
import { ConfigResolver } from '../config'
import { Container } from 'typescript-ioc'
import { ProviderResolver } from '../provider'

export class Ignitor {
  private routesResolver: RoutesResolver
  
  private readonly configResolver: ConfigResolver

  private readonly providerResolver: ProviderResolver

  private httpServer: HttpAdapter

  constructor(public readonly appRoot: string = 'config') {
    this.configResolver = new ConfigResolver(join(this.appRoot, 'config'))
    this.providerResolver = new ProviderResolver(Container.get(Config).get('app.providers', []))
  }

  public async create() {
    await this.configResolver.register()
    await this.providerResolver.register()
    
    this.setupHttpAdapter()

    await this.httpServer.initHttpServer()

    await this.registerGlobalMiddlewares()
    await this.registerRouters()
    await this.registerNotFoundHandler()
    await this.registerExceptionHandler()

    return this.createAdapterProxy()
  }

  private setupHttpAdapter() {
    this.httpServer = Container.get(HttpAdapter)
    this.routesResolver = new RoutesResolver(this.httpServer, this.providerResolver)
  }

  private async registerGlobalMiddlewares() {
    const middlewares: RequestMiddleware[] = Container.get(Config).get('app.middlewares', [])

    middlewares.forEach((middleware) => {
      if (!middleware.middleware[middleware.propertyKey || 'handle']) {
        return
      }

      this.httpServer.use(middleware.middleware[middleware.propertyKey || 'handle'])
    })
  }

  private async registerRouters(): Promise<void> {
    this.routesResolver.resolve(Container.get(Config).get('app.basePath', '/'))
  }

  private async registerExceptionHandler() {
    this.routesResolver.registerExceptionHandler()
  }

  private async registerNotFoundHandler() {
    this.routesResolver.registerNotFoundHandler()
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
