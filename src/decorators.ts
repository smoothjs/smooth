export type ParamData = object | string | number
export interface RouteParamMetadata {
  index: number
  data?: ParamData
}

export function assignMetadata<TParamtype = any, TArgs = any>(
  args: TArgs,
  paramtype: TParamtype,
  index: number,
  data?: ParamData
) {
  return {
    ...args,
    [`${paramtype}`]: {
      index,
      data,
    },
  }
}

function createParamDecorator(paramtype: string) {
  return (data?: ParamData): ParameterDecorator => (target, key, index) => {
    const args = Reflect.getMetadata('ROUTE_ARGS_METADATA', target.constructor, key) || {}
    Reflect.defineMetadata(
      'ROUTE_ARGS_METADATA',
      assignMetadata<any, Record<number, RouteParamMetadata>>(args, paramtype, index, data),
      target.constructor,
      key
    )
  }
}

export const Request: () => ParameterDecorator = createParamDecorator('REQUEST')

export const Response: () => ParameterDecorator = createParamDecorator('RESPONSE')

export const Next: () => ParameterDecorator = createParamDecorator('NEXT')

export const Session: () => ParameterDecorator = createParamDecorator('SESSION')

export function Headers(property?: string): ParameterDecorator {
  return createParamDecorator('HEADERS')(property)
}

export function Query(property?: string): ParameterDecorator {
  return createParamDecorator('QUERY')(property)
}

export function UploadedFile(fileKey?: string): ParameterDecorator {
  return createParamDecorator('FILES')(fileKey)
}

export function Param(property?: string): ParameterDecorator {
  return createParamDecorator('PARAM')(property)
}

export function HostParam(property?: string): ParameterDecorator {
  return createParamDecorator('HOST')(property)
}

export function BodyParam(property?: string): ParameterDecorator {
  return createParamDecorator('BODY')(property)
}

export const Req = Request
export const Res = Response
export const Host = HostParam
export const Body = BodyParam

export const File = UploadedFile
export const Files = UploadedFile
