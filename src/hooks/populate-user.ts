// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { Users } from '../services/users/users.class';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (_options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const {app, method, result, params} = context;

    const addUser = async (message: any) => {
      // TODO: the typescript declaration stuff doesn't quite work.
      const user = await (app.service('users') as Users).get(message.userId, params);
      return {
        ...message,
        user
      };
    };

    if (method == 'find') {
      context.result.data = await Promise.all(result.data.map(addUser));
    }
    if (method !== 'find') {
      context.result = await addUser(result);
    }
    return context;
  };
};
