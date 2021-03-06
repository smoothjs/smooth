import { getMetadata, setMetadata } from './utils'

export type HookFunction = (request: any, response: any, next: Function) => void | Promise<void>

export function Hook(hookFunction: HookFunction): MethodDecorator & ClassDecorator {
  return (target: any, key?: string | symbol) => {
    const hooks: HookFunction[] = getMetadata('HOOKS', target, key as string) || []
    hooks.unshift(hookFunction)
    setMetadata('HOOKS', target, hooks, key as string)
  }
}
