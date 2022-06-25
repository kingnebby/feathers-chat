import * as errors from '@feathersjs/errors';
import { Hook } from '@feathersjs/feathers';

export const commonErrorHandler: Hook = function commonErrorHandler(ctx) {
  if (ctx.error) {
    const error = ctx.error;
    if (!error.code) {
      const newError = new errors.GeneralError('server error');
      ctx.error = newError;
      return ctx;
    }
    if (error.code === 404 || process.env.NODE_ENV === 'production') {
      error.stack = null;
    }
    return ctx;
  }
};
