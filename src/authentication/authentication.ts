import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
import { LocalStrategy } from '@feathersjs/authentication-local';
import { expressOauth } from '@feathersjs/authentication-oauth';
import { ServiceAddons } from '@feathersjs/feathers';

import { GitHubStrategy } from './GitHubStrategy';
import { GoogleStrategy } from './GoogleStrategy';
import { Application } from '../declarations';
import hooks from './authen.hooks';


declare module '../declarations' {
  interface ServiceTypes {
    'authentication': AuthenticationService & ServiceAddons<any>;
  }
}

export default function(app: Application): void {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());
  // http://localhost:3030/oauth/github
  authentication.register('github', new GitHubStrategy());
  // http://localhost:3030/oauth/google
  authentication.register('google', new GoogleStrategy());

  // Here we bind the authentication service to the endpoint `authentication`
  app.use('/authentication', authentication);

  // register hooks
  const service = app.service('authentication');
  service.hooks(hooks);

  app.configure(expressOauth());
}
