// src/services/authentication/authentication.abilities.js
import { Ability, AbilityBuilder, createAliasResolver, makeAbilityFromRules } from 'feathers-casl';
import { NewUser } from '../services/users/users.class';

// https://feathers-casl.netlify.app/getting-started.html#getting-started-1

// don't forget this, as `read` is used internally
const resolveAction = createAliasResolver({
  update: 'patch',       // define the same rules for update & patch
  read: ['get', 'find'], // use 'read' as a equivalent for 'get' & 'find'
  delete: 'remove'       // use 'delete' or 'remove'
});

export const defineRulesFor = (user: NewUser) => {
  const {can, cannot, rules} = new AbilityBuilder(Ability);

  // cannot('manage', 'all');
  // return rules;

  if (user?.role?.name === 'super_admin') {
    can('manage', 'all');
    return rules;
  }

  if (user?.role?.name === 'admin') {
    can('create', 'users');
    can('update', 'users');
    can('update', 'messages');
  }

  if (user?.role?.name === 'user') {
    can('create', 'messages');
    can('read', 'messages');
    can('update', 'messages', {userId: user._id});
  }
  return rules;
};

export const defineAbilitiesFor = (user: NewUser) => {
  const rules = defineRulesFor(user);
  return makeAbilityFromRules(rules, { resolveAction });
};
