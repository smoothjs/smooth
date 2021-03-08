import 'reflect-metadata'
import { ServerResponse } from 'http'

export function getMetadata(key: string, target: object, propertyKey?: string | symbol): any {
  if (propertyKey) {
    const targetMetadata = Reflect.getMetadata(key, target.constructor)
    const propertyMetadata = Reflect.getMetadata(key, target, propertyKey)

    if (isObject(targetMetadata) || Array.isArray(targetMetadata)) {
      return [...targetMetadata, ...(propertyMetadata || [])]
    }

    return propertyMetadata
  }
  return Reflect.getMetadata(key, target)
}

export function setMetadata(
  key: string,
  target: object,
  value: any,
  propertyKey?: string | symbol
): any {
  if (propertyKey) {
    return Reflect.defineMetadata(key, value, target, propertyKey)
  }
  return Reflect.defineMetadata(key, value, target)
}

export function getMergedMetadata(
  metadata: any,
  key: string,
  target: object,
  propertyKey?: string | symbol
): object {
  const previousValue = getMetadata(key, target, propertyKey) || []

  return [...previousValue, ...metadata]
}

export function getMethods(obj: object | null): string[] {
  if (obj === Object.prototype) {
    return []
  }

  return Object.getOwnPropertyNames(obj).concat(getMethods(Object.getPrototypeOf(obj)))
}

export function isUndefined(value: any): boolean {
  return typeof value === 'undefined' || value === null
}

export function isString(value: any): boolean {
  return typeof value === 'string'
}

export function stripEndSlash(str?: string): string {
  return str ? (str[str.length - 1] === '/' ? str.slice(0, str.length - 1) : str) : ''
}

export function addLeadingSlash(str?: string): string {
  return str ? (str.charAt(0) !== '/' ? '/' + str : str) : ''
}

export function insertToArray(arr: any, index: number, ...newItems: any): any {
  if (!Array.isArray(arr)) {
    return arr
  }

  arr = [...arr.slice(0, index), ...newItems, ...arr.slice(index)]

  return arr
}

export function isFunction(value: any): boolean {
  return typeof value === 'function'
}

export function isObject(value: any): boolean {
  return typeof value === 'object'
}

export function isNumeric(value: any): boolean {
  if (!isString(value)) {
    return false
  }

  return !isNaN(value) && !isNaN(parseFloat(value))
}

export function isInteger(value: any): boolean {
  return typeof value === 'number'
}

export function isBoolean(value: any): boolean {
  return typeof value === 'boolean' || (isInteger(value) && (value === 0 || value === 1))
}

export function isHttpResponse(value: any, target?: object, propertyKey?: string): boolean {
  if (target && propertyKey) {
    const viewMetadata = getMetadata('ROUTE_VIEW_TEMPLATE', target, propertyKey)

    return isUndefined(viewMetadata) && !(value instanceof ServerResponse)
  }

  return !isUndefined(value)
}

export function isEmpty(value: any): boolean {
  if (Array.isArray(value)) {
    return value.length <= 0
  } else if (isString(value)) {
    return value === ''
  } else if (isObject(value)) {
    return Object.keys(value).length <= 0
  } else if (isBoolean(value)) {
    return !value
  } else if (isInteger(value)) {
    return value === 0
  }

  return isUndefined(value)
}
