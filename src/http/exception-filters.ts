import { ExceptionFilter } from '../interfaces/exception-filter'
import { Type } from '../interfaces/type'
import { getMergedMetadata, getMetadata, isFunction, setMetadata } from '../utils'

export function UseFilters(
  ...filters: (ExceptionFilter | Function)[]
): MethodDecorator & ClassDecorator {
  return (target: any, key?: string | symbol) => {
    for (const filter of filters) {
      const catchFunc = isFunction(filter) ? filter : (filter as Record<string, any>).catch
      const exceptionMetatypes = getMetadata('EXCEPTION_METATYPES', filter.constructor) || []

      setMetadata(
        'EXCEPTION_FILTERS',
        target,
        getMergedMetadata(
          [
            {
              func: catchFunc,
              exceptionMetatypes: exceptionMetatypes,
            },
          ],
          'EXCEPTION_FILTERS',
          target
        ),
        key
      )
    }
  }
}

export function Catch(...exceptions: Type<any>[]): ClassDecorator {
  return (target: object) => {
    setMetadata('EXCEPTION_METATYPES', target, exceptions)
  }
}
