import { UserConverter } from '../../../domain/infrastructure/persistance/adapters/user-domain-adapter';
import { PassportImpl, ReadOnlyPassport } from '../../../domain/contexts/iam/passport';
import { Context } from '../../context';
import { MemberConverter } from '../../../domain/infrastructure/persistance/adapters/member-domain-adapter';

export const getPassport = async (context: Context) => {
  let readOnlyPassport =  ReadOnlyPassport.GetInstance();
  let userExternalId = context.verifiedUser.verifiedJWT.sub;
  var mongoUser = await context.dataSources.userApi.getByExternalId(userExternalId);
  let mongoCommunity = await context.dataSources.communityApi.getCommunityByHeader(context.community);

  if(mongoCommunity && mongoUser) {  
    let mongoMember = await context.dataSources.memberApi.getMemberByCommunityIdUserId(mongoCommunity.id, mongoUser.id);
    if(mongoMember) {
      let userDo = new UserConverter().toDomain(mongoUser, {passport: readOnlyPassport});
      let memberDo = new MemberConverter().toDomain(mongoMember,{passport: readOnlyPassport});
      return new PassportImpl(userDo, memberDo);
    }
  }
  return readOnlyPassport;
}

export const ensureAccountPortalUser = (context: Context) => {
  if(context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
    throw new Error('Unauthorized');
  }
}