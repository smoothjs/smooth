import { RequestMethod } from '../enums'

export interface RequestMetadata {
  ROUTE_PATH?: string | string[]
  ROUTE_METHOD?: RequestMethod
}
