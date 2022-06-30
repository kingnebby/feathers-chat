import crypto from 'crypto';
import { Params } from '@feathersjs/feathers';
import { Service, NedbServiceOptions } from 'feathers-nedb';
import { Application } from '../../declarations';

export type UserRole = 'admin' | 'super_admin' | 'user'

export interface UserModelType {
  _id: string
  email: string
  password: string
  // This should probably be in its own db model
  role:  {
    name: UserRole
  }
  name?: string
  avatar?: string
  githubId?: string
  googleId?: string
}

// email, password is the only thing required??
export interface NewUser extends Partial<UserModelType> {
  email: string
  password: string
}

// This is actually the "Service" that gets its
// CRUD default methods from feathers, and we can add our own
// atop that.
export class Users extends Service<UserModelType> {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<NedbServiceOptions>, app: Application) {
    super(options);
  }

  create(data: NewUser, params?: Params) {
    const {email, name, password, githubId, googleId} = data;
    const avatar = data.avatar || getGravatar(email);
    const userData: NewUser = {
      email,
      name,
      role: {
        name: 'user'
      },
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
