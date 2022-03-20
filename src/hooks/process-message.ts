// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (_options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { data } = context;

    // Use something like joi? or can TS do this?
    if (!data.text) throw new Error('a message must have field: text');

    const user = context.params.user;
    const text = data.text.substring(0, 400);

    // override to sanitize
    context.data = {
      text,
      userId: user!._id,
      createdAt: new Date().getTime()
    };

    return context;
  };
};
