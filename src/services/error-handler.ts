import * as errors from '@feathersjs/errors';
import { Hook } from '@feathersjs/feathers';
import logger from '../logger';

export const commonErrorHandler: Hook = function commonErrorHandler(ctx) {
  if (ctx.error) {
    const error = ctx.error;
    const {message, stack} = error;
    if (!error.code) {
      const newError = new errors.GeneralError('server error');
      // TODO: not actually helpful.
      logger.error('error in some hook', {message, stack});
      ctx.error = newError;
      return ctx;
    }
    if (error.code === 404 || process.env.NODE_ENV === 'production') {
      error.stack = null;
    }
    return ctx;
  }
};
