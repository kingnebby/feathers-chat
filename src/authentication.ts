import { Params, ServiceAddons } from '@feathersjs/feathers';
import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
import { LocalStrategy } from '@feathersjs/authentication-local';
import { expressOauth, OAuthProfile, OAuthStrategy } from '@feathersjs/authentication-oauth';

import { Application } from './declarations';

declare module './declarations' {
  interface ServiceTypes {
    'authentication': AuthenticationService & ServiceAddons<any>;
  }
}

class GitHubStrategy extends OAuthStrategy {
  async getEntityData(profile: OAuthProfile, existingEntity: any, params: Params): Promise<{ [x: string]: any; }> {
    const baseData = await super.getEntityData(profile, existingEntity, params);
    return {
      ...baseData,
      name: profile.login,
      avatar: profile.avatar_url,
      email: profile.email
    };
  }

}

export default function(app: Application): void {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());
  // http://localhost:3030/oauth/github
  authentication.register('github', new GitHubStrategy());

  // Here we bind the authentication service to the endpoint `authentication`
  app.use('/authentication', authentication);
  app.configure(expressOauth());
}
