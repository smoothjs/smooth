export type RequestHandler<IRequest = any, IResponse = any> = (
  req: IRequest,
  res: IResponse,
  next?: Function
) => any

export interface HttpServer<IServer = any, IRequest = any, IResponse = any> {
  use(handler: RequestHandler<IRequest, IResponse>): any
  use(path: string, handler: RequestHandler<IRequest, IResponse>): any
  get(handler: RequestHandler<IRequest, IResponse>): any
  get(path: string, handler: RequestHandler<IRequest, IResponse>): any
  post(handler: RequestHandler<IRequest, IResponse>): any
  post(path: string, handler: RequestHandler<IRequest, IResponse>): any
  head(handler: RequestHandler<IRequest, IResponse>): any
  head(path: string, handler: RequestHandler<IRequest, IResponse>): any
  put(handler: RequestHandler<IRequest, IResponse>): any
  put(path: string, handler: RequestHandler<IRequest, IResponse>): any
  patch(handler: RequestHandler<IRequest, IResponse>): any
  patch(path: string, handler: RequestHandler<IRequest, IResponse>): any
  options(handler: RequestHandler<IRequest, IResponse>): any
  options(path: string, handler: RequestHandler<IRequest, IResponse>): any
  delete(handler: RequestHandler<IRequest, IResponse>): any
  delete(path: string, handler: RequestHandler<IRequest, IResponse>): any
  listen(port: number | string, callback?: () => void): any
  listen(port: number | string, hostname: string, callback?: () => void): any
  status(response: any, statusCode: number): any
  render(response: any, view: string, options: any): any
  redirect(response: any, statusCode: number, url: string): any
  setHeader(response: any, name: string, value: string): any
  setNotFoundHandler?(handler: Function, prefix?: string): any
  setBaseViewsDir?(path: string | string[]): this
  setViewEngine?(engineOrOptions: any): this
  useStaticAssets?(path: string | string[]): this
  getInstance(): any
  getHttpServer(): any
  setHttpServer(httpServer: IServer): void
  init?(): Promise<void>
  close(): any
  sendResponse(response: any, ...args): any
  createMiddlewareFactory(requestMethod: string): any
  useBodyParser(): any
  getRequestHostname(request: any): any
}
