import { Singleton, OnlyInstantiableByContainer } from 'typescript-ioc'

@OnlyInstantiableByContainer
@Singleton
export abstract class Response {
    //
}