import { Params } from '@feathersjs/feathers';
import { OAuthProfile, OAuthStrategy } from '@feathersjs/authentication-oauth';
import logger from '../logger';

export class GoogleStrategy extends OAuthStrategy {
  async getEntityData(profile: OAuthProfile, existingEntity: any, params: Params): Promise<{ [x: string]: any; }> {
    const baseData = await super.getEntityData(profile, existingEntity, params);
    logger.debug('user authenticated?', {profile, baseData});
    return {
      ...baseData,
      name: profile.email,
      email: profile.email,
      avatar: profile.picture,
    };
  }

}
