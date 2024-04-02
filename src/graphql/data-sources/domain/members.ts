import { Member as MemberDO } from '../../../app/domain/contexts/community/member';
import { MemberConverter, MemberDomainAdapter } from '../../../infrastructure-services-impl/datastore/mongodb/infrastructure/member.domain-adapter';
import { MongoMemberRepository } from '../../../infrastructure-services-impl/datastore/mongodb/infrastructure/member.mongo-repository';
import { GraphqlContext } from '../../graphql-context';
import { MemberAccountAddInput, MemberAccountRemoveInput, MemberCreateInput, MemberProfileUpdateInput, MemberUpdateInput, MemberAccountEditInput } from '../../schema/builder/generated';
import { DomainDataSource } from './domain-data-source';
import { Member } from '../../../infrastructure-services-impl/datastore/mongodb/models/member';
import { CommunityConverter } from '../../../infrastructure-services-impl/datastore/mongodb/infrastructure/community.domain-adapter';
import { ReadOnlyPassport } from '../../../app/domain/contexts/iam/passport';
import { RoleConverter } from '../../../infrastructure-services-impl/datastore/mongodb/infrastructure/role.domain-adapter';
import { UserConverter } from '../../../infrastructure-services-impl/datastore/mongodb/infrastructure/user.domain-adapter';
import { Interests } from '../../../app/domain/contexts/community/profile.value-objects';
import { CustomViewColumnsToDisplay, CustomViewFilters } from '../../../app/domain/contexts/community/custom-view.value-objects';

type PropType = MemberDomainAdapter;
type DomainType = MemberDO<PropType>;
type RepoType = MongoMemberRepository<PropType>;

export class Members extends DomainDataSource<GraphqlContext, Member, PropType, DomainType, RepoType> {
  async memberCreate(input: MemberCreateInput): Promise<Member> {
    console.log(`memberCreate`, this.context.verifiedUser);
    if (this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:memberCreate');
    }

    let memberToReturn: Member;
    let community = await this.context.dataSources.communityCosmosdbApi.getCommunityById(this.context.community);
    let communityDo = new CommunityConverter().toDomain(community, { passport: ReadOnlyPassport.GetInstance() });

    await this.withTransaction(async (repo) => {
      let newMember = await repo.getNewInstance(input.memberName, communityDo);
      memberToReturn = new MemberConverter().toPersistence(await repo.save(newMember));
    });
    return memberToReturn;
  }

  async memberUpdate(input: MemberUpdateInput): Promise<Member> {
    let memberToReturn: Member;
    let roleDo;
    if (input.role !== undefined) {
      let mongoRole = await this.context.dataSources.roleCosmosdbApi.findOneById(input.role);
      roleDo = new RoleConverter().toDomain(mongoRole, { passport: ReadOnlyPassport.GetInstance() });
    }
    await this.withTransaction(async (repo) => {
      let member = await repo.getById(input.id);
      if (input.memberName !== undefined) member.MemberName=(input.memberName);
      if (roleDo !== undefined) member.Role=(roleDo);
      if (input.customViews !== undefined) {
        let systemCustomViews = member.customViews;
        let updatedCustomViews = input.customViews;
        updatedCustomViews.forEach((customView) => {
          // add new custom view
          if (!customView.id) {
            let newCustomView = member.requestNewCustomView();
            newCustomView.name=(customView.name);
            newCustomView.type=(customView.type);
            newCustomView.filters=(new CustomViewFilters(customView.filters ?? []));
            newCustomView.order=(customView.sortOrder ?? '');
            newCustomView.columnsToDisplay=(new CustomViewColumnsToDisplay(customView.columnsToDisplay ?? []));
          } else {
            // update existing custom view
            let systemCustomView = systemCustomViews.find((c) => c.id === customView.id);
            if (systemCustomView === undefined) throw new Error('Custom view not found');
            systemCustomView.name=(customView.name);
            systemCustomView.type=(customView.type);
            systemCustomView.filters=(new CustomViewFilters(customView.filters ?? []));
            systemCustomView.order=(customView.sortOrder ?? '');
            systemCustomView.columnsToDisplay=(new CustomViewColumnsToDisplay(customView.columnsToDisplay ?? []));
          }
        });
        let customViewIds = updatedCustomViews.filter((x) => x.id !== undefined).map((x) => x.id);
        systemCustomViews
          .filter((customView) => {
            console.log('customView.name', customView.name);
            return !customViewIds.includes(customView.id);
          })
          .forEach((customView) => member.requestRemoveCustomView(customView));
      }
      memberToReturn = new MemberConverter().toPersistence(await repo.save(member));
    });
    return memberToReturn;
  }

  async memberAccountAdd(input: MemberAccountAddInput): Promise<Member> {
    let memberToReturn: Member;

    let mongoUser = await this.context.dataSources.userCosmosdbApi.findOneById(input.account.user);
    let userDo = new UserConverter().toDomain(mongoUser, { passport: ReadOnlyPassport.GetInstance() });

    let currentMongoUser = await this.context.dataSources.userCosmosdbApi.getByExternalId(this.context.verifiedUser.verifiedJWT.sub);
    let currentUserDo = new UserConverter().toDomain(currentMongoUser, { passport: ReadOnlyPassport.GetInstance() });

    await this.withTransaction(async (repo) => {
      let member = await repo.getById(input.memberId);
      let account = member.requestNewAccount();
      account.user=(userDo);
      account.firstName=input.account.firstName;
      account.lastName=(input.account.lastName);
      account.createdBy=(currentUserDo);
      memberToReturn = new MemberConverter().toPersistence(await repo.save(member));
    });
    return memberToReturn;
  }

  async memberAccountEdit(input: MemberAccountEditInput): Promise<Member> {
    let memberToReturn: Member;
    await this.withTransaction(async (repo) => {
      let member = await repo.getById(input.memberId);
      let account = member.accounts.find((a) => a.id === input.accountId);
      account.firstName=input.firstName;
      account.lastName=input.lastName;
      memberToReturn = new MemberConverter().toPersistence(await repo.save(member));
    });
    return memberToReturn;
  }

  async memberAccountRemove(input: MemberAccountRemoveInput): Promise<Member> {
    let memberToReturn: Member;
    await this.withTransaction(async (repo) => {
      let member = await repo.getById(input.memberId);
      let accountRef = member.accounts.find((a) => a.id === input.accountId);
      member.requestRemoveAccount(accountRef.props);
      memberToReturn = new MemberConverter().toPersistence(await repo.save(member));
    });
    return memberToReturn;
  }
  
  async memberProfileUpdateAvatar(memberId: string, avatarDocumentId: string): Promise<Member> {
    let memberToReturn: Member;
    await this.withTransaction(async (repo) => {
      let member = await repo.getById(memberId);
      let profile = member.profile;
      profile.AvatarDocumentId=(avatarDocumentId);
      memberToReturn = new MemberConverter().toPersistence(await repo.save(member));
    });
    return memberToReturn;
  }

  async memberProfileUpdate(input: MemberProfileUpdateInput): Promise<Member> {
    let memberToReturn: Member;
    await this.withTransaction(async (repo) => {
      let member = await repo.getById(input.memberId);
      let profile = member.profile;
      profile.Name=(input.profile.name);
      profile.Email=(input.profile.email);
      profile.Bio=(input.profile.bio);
      profile.Interests=(new Interests(input.profile.interests));
      profile.ShowInterests=(input.profile.showInterests);
      profile.ShowEmail=(input.profile.showEmail);
      profile.ShowLocation=(input.profile.showLocation);
      profile.ShowProfile=(input.profile.showProfile);
      profile.ShowProperties=(input.profile.showProperties);
      memberToReturn = new MemberConverter().toPersistence(await repo.save(member));
    });
    return memberToReturn;
  }
}
