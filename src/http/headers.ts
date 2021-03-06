import 'reflect-metadata'
import { getMergedMetadata, setMetadata } from '../utils'

export function Header(name: string, content: string): MethodDecorator & ClassDecorator {
  return (target: any, key?: string | symbol) => {
    setMetadata(
      'HEADERS',
      target,
      getMergedMetadata([{ name, content }], 'HEADERS', target, key),
      key
    )
  }
}
