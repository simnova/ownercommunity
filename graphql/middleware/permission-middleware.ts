import { rule } from 'graphql-shield'
import { Context } from '../context'

export const isAccountPortalUser = rule()(async (parent, args, ctx: Context, info) => {
  let result = ctx.verifiedUser && ctx.verifiedUser.openIdConfigKey === 'AccountPortal';
  console.log('isAcountPortalUser', result)
  return result;
})