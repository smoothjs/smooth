import { Type } from './type'

export interface ExceptionFilter {
  catch(exception: any, response: any): any
}

export interface ExceptionFilterMetadata {
  func: ExceptionFilter['catch']
  exceptionMetatypes: Type<any>[]
}
