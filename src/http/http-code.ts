import { setMetadata } from '../utils'

export function HttpCode(statusCode: number): MethodDecorator & ClassDecorator {
  return (target: any, key?: string | symbol) => {
    setMetadata('STATUS_CODE', target, statusCode, key)
  }
}
