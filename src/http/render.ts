import { setMetadata } from '../utils'

export function Render(template: string): MethodDecorator {
  return (target: any, key: string | symbol) => {
    setMetadata('ROUTE_VIEW_TEMPLATE', target, template, key)
  }
}

export const View = Render
