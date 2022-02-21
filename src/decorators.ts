import { setMetadata } from './utils'

export type ParamData = object | string | number

export function SetMetadata(
  metadataKey: string,
  metadataValue: any
): ClassDecorator & MethodDecorator {
  return (target: object, key?: string | symbol) => {
    setMetadata(metadataKey, target, metadataValue, key as string)
  }
}

