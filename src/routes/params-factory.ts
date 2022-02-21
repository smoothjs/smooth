import { Class } from '../interfaces'
import { Container } from 'typescript-ioc'

export class RouterParamsFactory {
  
  public async resolve(
    parameters: Class<Function>[],
    overrides: Function[] = []
  ): Promise<any> {
    return await Promise.all(parameters.map(async (parameter) => {
      return Container.get(parameter)
    }))
  }
}
