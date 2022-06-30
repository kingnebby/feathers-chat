import * as authentication from '@feathersjs/authentication';
import processMessage from '../../hooks/process-message';
import populateUser from '../../hooks/populate-user';
import { commonErrorHandler } from '../error-handler';
import { hooks } from 'feathers-casl';
import { defineAbilitiesFor } from '../../authorization/ability';
import { HookContext } from '../../app';
import { UserModelType } from '../users/users.class';

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [
      authenticate('jwt'),
      (context: HookContext): HookContext => {
        const { user } = context.params;
        if (user) context.params.ability = defineAbilitiesFor(user as UserModelType);
        return context;
      },
      hooks.authorize({adapter: 'feathers-nedb'})
    ],
    find: [],
    get: [],
    create: [processMessage()],
    update: [processMessage()],
    patch: [processMessage()],
    remove: []
  },

  after: {
    all: [populateUser()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [commonErrorHandler],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
