import { UserConverter } from '../../domain/infrastructure/persistance/adapters/user-domain-adapter';
import { PassportImpl, ReadOnlyPassport } from '../../domain/contexts/iam/passport';
import { Context } from '../context';
import { MemberConverter } from '../../domain/infrastructure/persistance/adapters/member-domain-adapter';
import { CommunityConverter } from '../../domain/infrastructure/persistance/adapters/community-domain-adapter';

export const getPassport = async (context: Context) => {
  let readOnlyPassport = ReadOnlyPassport.GetInstance();
  let userExternalId = context.verifiedUser.verifiedJWT.sub;
  let mongoUser = await context.dataSources.userApi.getByExternalId(userExternalId);
  let mongoCommunity = await context.dataSources.communityApi.getCommunityByHeader(context.community);
  let mongoMember = (
    await(
    await(
    await(
      await context.dataSources.memberApi.getMemberByCommunityIdUserId(mongoCommunity.id, mongoUser.id)
    ).populate('community')
    ).populate('role')
    ).populate('accounts.user') //don't like this, but we use a check for this in the passport
  );

  if(mongoCommunity && mongoMember && mongoUser) {
    let userDo = new UserConverter().toDomain(mongoUser, {passport: readOnlyPassport});
    let memberDo = new MemberConverter().toDomain(mongoMember,{passport: readOnlyPassport});
    return new PassportImpl(userDo, memberDo);
  }
  return readOnlyPassport;
}

export const getCommunityVisa = async (context: Context) => {
  let readOnlyPassport = ReadOnlyPassport.GetInstance();
  let userExternalId = context.verifiedUser.verifiedJWT.sub;
  let mongoUser = await context.dataSources.userApi.getByExternalId(userExternalId);
  let mongoCommunity = await context.dataSources.communityApi.getCommunityByHeader(context.community);
  let mongoMember = (
    await(
    await(
    await(
      await context.dataSources.memberApi.getMemberByCommunityIdUserId(mongoCommunity.id, mongoUser.id)
    ).populate('community')
    ).populate('role')
    ).populate('accounts.user') //don't like this, but we use a check for this in the passport
  );

  if(mongoCommunity && mongoMember && mongoUser) {
    let userDo = new UserConverter().toDomain(mongoUser, {passport: readOnlyPassport});
    let memberDo = new MemberConverter().toDomain(mongoMember,{passport: readOnlyPassport});
    return new PassportImpl(userDo, memberDo);
  }
  return readOnlyPassport.forCommunity(new CommunityConverter().toDomain(mongoCommunity, {passport: readOnlyPassport}));

}



export const ensureAccountPortalUser = (context: Context) => {
  if(context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
    throw new Error('Unauthorized');
  }
}