import { ExceptionFilter } from '../interfaces/exception-filter'
import { Type } from '../interfaces/type'
import { getMergedMetadata, getMetadata, isFunction, setMetadata } from '../utils'

export function UseFilters(
  ...filters: (ExceptionFilter | Function)[]
): MethodDecorator & ClassDecorator {
  return (target: any, key?: string | symbol) => {
    setMetadata(
      'EXCEPTION_FILTERS',
      target,
      getMergedMetadata(filters, 'EXCEPTION_FILTERS', target),
      key
    )
  }
}

export function Catch(...exceptions: Type<any>[]): ClassDecorator {
  return (target: object) => {
    setMetadata('EXCEPTION_METATYPES', target, exceptions)
  }
}
