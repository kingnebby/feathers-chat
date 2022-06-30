import * as errors from '@feathersjs/errors';
import { Hook } from '@feathersjs/feathers';
import logger from '../logger';
import {VError} from 'verror';

export const commonErrorHandler: Hook = function commonErrorHandler(ctx) {
  if (ctx.error) {
    const error = new VError(ctx.error, 'error in hook');
    if (!ctx.error.code) {
      const newError = new errors.GeneralError('server error');
      // TODO: not actually helpful.
      logger.error('error in some hook', {error, stack: VError.fullStack(ctx.error)});
      ctx.error = newError;
      return ctx;
    }
    // if (ctx.error.code === 404 || process.env.NODE_ENV === 'production') {
    ctx.error.stack = null;
    // }
    return ctx;
  }
};
