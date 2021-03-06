import { HttpStatus } from '../enums/http-status'
import { setMetadata } from '../utils'

export function Redirect(url: string, statusCode?: number): MethodDecorator {
  return (target: any, key: string | symbol) => {
    setMetadata(
      'ROUTE_REDIRECT',
      target,
      {
        url: url,
        statusCode: statusCode || HttpStatus.FOUND,
      },
      key
    )
  }
}
