import 'reflect-metadata'
import { RequestMiddleware } from '../interfaces/request-middleware'
import { getMergedMetadata, setMetadata } from '../utils'

export function Middleware(
  middleware: object,
  propertyKey?: string
): MethodDecorator & ClassDecorator {
  return (target: any, key?: string | symbol) => {
    propertyKey = propertyKey || 'handle'
    setMetadata(
      'MIDDLEWARES',
      target,
      getMergedMetadata([{ middleware, propertyKey }], 'MIDDLEWARES', target),
      key
    )
  }
}
