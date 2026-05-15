
import { Context } from './Context'


class LogotypesError extends Error {

  isLogotypesError = true

  sdk = 'Logotypes'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  LogotypesError
}

