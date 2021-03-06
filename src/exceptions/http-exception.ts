export class HttpException extends Error {
  public name: string
  public message: string
  public data?: any
  public help?: string
  public code?: string
  public status: number

  constructor(message: string = 'Bad Request', status: number = 500, code?: string, data?: any) {
    super(message)

    /**
     * Set error message
     */
    Object.defineProperty(this, 'message', {
      configurable: true,
      enumerable: false,
      value: code ? `${code}: ${message}` : message,
      writable: true,
    })

    /**
     * Set error name as a public property
     */
    Object.defineProperty(this, 'name', {
      configurable: true,
      enumerable: false,
      value: this.constructor.name,
      writable: true,
    })

    /**
     * Set status as a public property
     */
    Object.defineProperty(this, 'status', {
      configurable: true,
      enumerable: false,
      value: status,
      writable: true,
    })

    /**
     * Set error code as a public property (only when defined)
     */
    if (code) {
      Object.defineProperty(this, 'code', {
        configurable: true,
        enumerable: false,
        value: code,
        writable: true,
      })
    }

    if (data) {
      Object.defineProperty(this, 'data', {
        configurable: true,
        enumerable: false,
        value: data,
        writable: true,
      })
    }

    /**
     * Update the stack trace
     */
    Error.captureStackTrace(this, this.constructor)
  }

  public getMessage(): string {
    return this.message
  }

  public getStatus(): number {
    return this.status
  }

  public getCode(): any {
    return this.code
  }

  public getData(): any {
    return this.data
  }
}
