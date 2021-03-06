export class RouterParamsFactory {
  public getValueByKey<IRequest extends Record<string, any> = any, IResponse = any, IResult = any>(
    key: string,
    data: string | object | any,
    { req, res, next }: { req: IRequest; res: IResponse; next: Function }
  ): IResult {
    switch (key) {
      case 'REQUEST':
        return req as any
      case 'NEXT':
        return next as any
      case 'RESPONSE':
        return res as any
      case 'PARAM':
        return data ? req.params[data] : req.params
      case 'SESSION':
        return data ? req.session[data] : req.session
      case 'QUERY':
        return data ? req.query[data] : req.query
      case 'HEADERS':
        return data ? req.headers[data.toLowerCase()] : req.headers
      case 'BODY':
        return data && req.body ? req.body[data] : req.body
      case 'HOST':
        const hosts = req.hosts || {}
        return data ? hosts[data] : hosts
      case 'FILES':
        return data ? req.files[data] : req.files
      default:
        return null as any
    }
  }

  public getValuesFromArray<IRequest extends Record<string, any> = any, IResponse = any>(
    keys: any,
    { req, res, next }: { req: IRequest; res: IResponse; next: Function }
  ) {
    let values: any[] = []

    let key: string
    let data: any
    for ([key, data] of Object.entries(keys)) {
      values[data.index] = this.getValueByKey(key, data.data, { req, res, next })
    }

    return values
  }
}
