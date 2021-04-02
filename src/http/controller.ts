import 'reflect-metadata'
import { Controller } from '../interfaces/controller'
import { setMetadata } from '../utils'

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
    setMetadata('CONTROLLER_PATH', target, path)
  }
}
