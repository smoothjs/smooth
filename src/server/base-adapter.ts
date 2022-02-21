import { HttpServer, RequestHandler } from '../interfaces/http-server'

export abstract class HttpAdapter<IServer = any, IRequest = any, IResponse = any>
  implements HttpServer<IServer, IRequest, IResponse>
{
  protected httpServer: IServer

  constructor(protected instance: any) {}

  public all(handler: RequestHandler<IRequest, IResponse>)
  public all(path: string, handler: RequestHandler<IRequest, IResponse>)
  public all(...args: []) {
    throw new Error('Method not implemented.')
  }

  public get(handler: RequestHandler<IRequest, IResponse>)
  public get(path: string, handler: RequestHandler<IRequest, IResponse>)
  public get(...args: any[]) {
    return this.instance.get(...args)
  }

  public post(handler: RequestHandler<IRequest, IResponse>)
  public post(path: string, handler: RequestHandler<IRequest, IResponse>)
  public post(...args: any[]) {
    return this.instance.post(...args)
  }

  public head(handler: RequestHandler<IRequest, IResponse>)
  public head(path: string, handler: RequestHandler<IRequest, IResponse>)
  public head(...args: any[]) {
    return this.instance.head(...args)
  }

  public put(handler: RequestHandler<IRequest, IResponse>)
  public put(path: string, handler: RequestHandler<IRequest, IResponse>)
  public put(...args: any[]) {
    return this.instance.put(...args)
  }

  public patch(handler: RequestHandler<IRequest, IResponse>)
  public patch(path: string, handler: RequestHandler<IRequest, IResponse>)
  public patch(...args: any[]) {
    return this.instance.patch(...args)
  }

  public options(handler: RequestHandler<IRequest, IResponse>)
  public options(path: string, handler: RequestHandler<IRequest, IResponse>)
  public options(...args: any[]) {
    return this.instance.options(...args)
  }

  public delete(handler: RequestHandler<IRequest, IResponse>)
  public delete(path: string, handler: RequestHandler<IRequest, IResponse>)
  public delete(...args: any[]) {
    return this.instance.delete(...args)
  }

  public listen(port: string | number, callback?: () => void)
  public listen(port: string | number, hostname: string, callback?: () => void)
  public listen(port: any, hostname?: any, callback?: any) {
    return this.instance.listen(port, hostname, callback)
  }

  public use(...args: any[]) {
    return this.instance.use(...args)
  }

  public setBaseViewsDir?(path: string | string[]): this {
    throw new Error('Method not implemented.')
  }

  public getHttpServer(): IServer {
    return this.httpServer as IServer
  }

  public setHttpServer(httpServer: IServer) {
    this.httpServer = httpServer
  }

  public getInstance<T = any>(): T {
    return this.instance as T
  }

  public async init() {}

  abstract close()
  abstract getRequestHostname(request)
  abstract setViewEngine(engine: string)
  abstract status(response, statusCode: number)
  abstract render(response, view: string, options: any)
  abstract redirect(response, statusCode: number, url: string)
  abstract setHeader(response, name: string, value: string)
  abstract initHttpServer()
  abstract createMiddlewareFactory(requestMethod: string)
  abstract sendResponse(response, ...args)
}
