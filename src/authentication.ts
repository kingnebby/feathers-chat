import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
import { LocalStrategy } from '@feathersjs/authentication-local';
import { expressOauth } from '@feathersjs/authentication-oauth';
import { ServiceAddons } from '@feathersjs/feathers';

import { GitHubStrategy } from './authentication/GitHubStrategy';
import { GoogleStrategy } from './authentication/GoogleStrategy';
import { Application } from './declarations';

declare module './declarations' {
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
  app.configure(expressOauth());
}
