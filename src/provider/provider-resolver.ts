import { Container } from 'typescript-ioc'
import { Class } from '../interfaces'
import { Provider } from './provider'

export class ProviderResolver {
    constructor(private providers: Class<Provider>[]) {}

    public async register() {
        await Promise.all(
            this.providers.map(provider => {
                const instance = Container.get(provider)
                return instance.register()
            })
        )
    }

    public async boot() {
        await Promise.all(
            this.providers.map(provider => {
                const instance = Container.get(provider)
                return instance.register()
            })
        )
    }
}