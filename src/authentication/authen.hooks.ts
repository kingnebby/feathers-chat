// Application hooks that run for every service
// Don't remove this comment. It's needed to format import lines nicely.
import { HookContext } from '@feathersjs/feathers';
import { defineAbilitiesFor } from '../authorization/ability';
import { commonErrorHandler } from '../services/error-handler';
import { NewUser } from '../services/users/users.class';

export default {
  before: {
    all: [
      (context: HookContext): HookContext => {
        return context;
      }
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
      (context: HookContext): HookContext => {
        return context;
      }
    ],
    find: [],
    get: [],
    create: [
      (context: HookContext): HookContext => {
        // TODO: type user object?
        const { user } = context.result;
        if (!user) return context;

        const ability = defineAbilitiesFor(user as NewUser);

        context.result.ability = ability;
        context.result.rules = ability.rules;

        return context;
      }
    ],
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
