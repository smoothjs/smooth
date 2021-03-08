import { RequestMiddleware } from "./request-middleware";

export interface IController {
  controllers: any
  middlewares: RequestMiddleware[]
  [key: string]: any
}
