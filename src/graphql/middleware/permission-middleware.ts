import { rule } from 'graphql-shield'
import { GraphqlContext } from '../graphql-context'

export const isAccountPortalUser = rule()(async (parent, args, ctx: GraphqlContext, info) => {
  let result = ctx.verifiedUser && ctx.verifiedUser.openIdConfigKey === 'AccountPortal';
  console.log('isAcountPortalUser', result)
  return result;
})