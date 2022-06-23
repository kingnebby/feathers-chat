import { Params } from '@feathersjs/feathers';
import { OAuthProfile, OAuthStrategy } from '@feathersjs/authentication-oauth';

export class GitHubStrategy extends OAuthStrategy {
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
