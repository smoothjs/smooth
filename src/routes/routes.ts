import { RequestMethod } from '../enums'
import { RequestMetadata } from '../interfaces'
import { setMetadata } from '../utils'

const defaultMetadata = {
  ROUTE_PATH: '/',
  ROUTE_METHOD: RequestMethod.GET,
}

export const RequestMapping = (metadata: RequestMetadata = defaultMetadata): MethodDecorator => {
  const pathMetadata = metadata['ROUTE_PATH']
  const requestMethod = metadata['ROUTE_METHOD'] || RequestMethod.GET

  return (target: object, key: string | symbol) => {
    const path = pathMetadata && pathMetadata.length ? pathMetadata : key

    setMetadata('ROUTE_PATH', target, path, key)
    setMetadata('ROUTE_METHOD', target, requestMethod, key)
  }
}

const createMappingDecorator =
  (method: RequestMethod) =>
  (path?: string | string[]): MethodDecorator => {
    return RequestMapping({
      ROUTE_PATH: path,
      ROUTE_METHOD: method,
    })
  }

export const All = createMappingDecorator(RequestMethod.ALL)

export const Get = createMappingDecorator(RequestMethod.GET)

export const Head = createMappingDecorator(RequestMethod.HEAD)

export const Options = createMappingDecorator(RequestMethod.OPTIONS)

export const Post = createMappingDecorator(RequestMethod.POST)

export const Put = createMappingDecorator(RequestMethod.PUT)

export const Patch = createMappingDecorator(RequestMethod.PATCH)

export const Delete = createMappingDecorator(RequestMethod.DELETE)
