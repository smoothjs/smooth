import 'reflect-metadata'
import { Controller } from '../interfaces/controller'

export function Controller(): ClassDecorator
export function Controller(prefix: string | string[]): ClassDecorator
export function Controller(options: Controller): ClassDecorator
export function Controller(prefixOrOptions?: string | string[] | Controller): ClassDecorator {
  const defaultPath = '/'

  const [path, host] =
    typeof prefixOrOptions === 'undefined'
      ? [defaultPath, undefined, undefined]
      : typeof prefixOrOptions === 'string' || Array.isArray(prefixOrOptions)
      ? [prefixOrOptions, undefined, undefined]
      : [prefixOrOptions.path || defaultPath, prefixOrOptions.host]

  return (target: object) => {
    Reflect.defineMetadata('CONTROLLER_HOST', host, target)
    Reflect.defineMetadata('CONTROLLER_PATH', path, target)
  }
}
