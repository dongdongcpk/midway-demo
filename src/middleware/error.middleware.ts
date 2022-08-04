import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';

@Middleware()
export class ErrorMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      try {
        await next();
      } catch (err) {
        return {
          code: 400,
          result: 'error',
          message: err.message,
          data: null,
        };
      }
    };
  }

  static getName(): string {
    return 'error';
  }
}
