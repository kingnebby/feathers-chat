import { Id, Params } from '@feathersjs/feathers';
import { Service, NedbServiceOptions } from 'feathers-nedb';
import { VError } from 'verror';
import { Application } from '../../declarations';

export class Messages extends Service {
  constructor(options: Partial<NedbServiceOptions>, _app: Application) {
    super(options);
  }

  async update(id: Id, data: any, params?: Params | undefined): Promise<any> {
    // In feathers, we kind of have to make a choice, the data model should
    // define and protect it's data. Hence why I want to put it here.
    // This is only a problem because we're using nedb which applies no data constraints
    const isValid = data?.text != null && data?.userId != null;
    if (!isValid) throw new VError({info: data}, 'model is not valid');

    return this._update(id, data, params);
  }
}
