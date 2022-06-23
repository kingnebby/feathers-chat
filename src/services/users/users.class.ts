import crypto from 'crypto';
import { Params } from '@feathersjs/feathers';
import { Service, NedbServiceOptions } from 'feathers-nedb';
import { Application } from '../../declarations';

interface UserData {
  _id?: string;
  email: string;
  password: string
  name?: string
  avatar?: string
  githubId?: string
  googleId?: string
}

export class Users extends Service<UserData> {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<NedbServiceOptions>, app: Application) {
    super(options);
  }

  create(data: UserData, params?: Params) {
    const {email, name, password, githubId, googleId} = data;
    const avatar = data.avatar || getGravatar(email);
    const userData = {
      email,
      name,
      password,
      githubId,
      googleId,
      avatar
    };
    return super.create(userData, params);
  }

  // What about mapping other routes?
  doSomething() {
    return;
  }
}

const gravatarUrl = 'https://s.gravatar.com/avatar';
const query = 's=60';
function getGravatar(email: string) {
  const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
  return `${gravatarUrl}/${hash}?${query}`;
}
