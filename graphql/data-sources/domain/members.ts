import { Member as MemberDO } from '../../../domain/contexts/community/member';
import { MemberConverter, MemberDomainAdapter } from '../../../domain/infrastructure/persistence/member.domain-adapter';
import { MongoMemberRepository } from '../../../domain/infrastructure/persistence/member.mongo-repository';
import { Context } from '../../context';
import { MemberAccountAddInput, MemberAccountRemoveInput, MemberCreateInput, MemberProfileUpdateInput, MemberUpdateInput, MemberAccountEditInput } from '../../generated';
import { DomainDataSource } from './domain-data-source';
import { Member } from '../../../infrastructure/data-sources/cosmos-db/models/member';
import { CommunityConverter } from '../../../domain/infrastructure/persistence/community.domain-adapter';
import { ReadOnlyPassport } from '../../../domain/contexts/iam/passport';
import { RoleConverter } from '../../../domain/infrastructure/persistence/role.domain-adapter';
import { UserConverter } from '../../../domain/infrastructure/persistence/user.domain-adapter';
import { Interests } from '../../../domain/contexts/community/profile.value-objects';
import { CustomViewColumnsToDisplay, CustomViewFilters } from '../../../domain/contexts/community/custom-view.value-objects';

type PropType = MemberDomainAdapter;
type DomainType = MemberDO<PropType>;
type RepoType = MongoMemberRepository<PropType>;

export class Members extends DomainDataSource<Context, Member, PropType, DomainType, RepoType> {
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
      memberToReturn = new MemberConverter().toMongo(await repo.save(newMember));
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
      if (input.memberName !== undefined) member.requestSetMemberName(input.memberName);
      if (roleDo !== undefined) member.requestSetRole(roleDo);
      if (input.customViews !== undefined) {
        let systemCustomViews = member.customViews;
        let updatedCustomViews = input.customViews;
        updatedCustomViews.forEach((customView) => {
          // add new custom view
          if (!customView.id) {
            let newCustomView = member.requestNewCustomView();
            newCustomView.requestSetName(customView.name);
            newCustomView.requestSetType(customView.type);
            newCustomView.requestSetFilters(new CustomViewFilters(customView.filters ?? []));
            newCustomView.requestSetOrder(customView.sortOrder ?? '');
            newCustomView.requestSetColumnsToDisplay(new CustomViewColumnsToDisplay(customView.columnsToDisplay ?? []));
          } else {
            // update existing custom view
            let systemCustomView = systemCustomViews.find((c) => c.id === customView.id);
            if (systemCustomView === undefined) throw new Error('Custom view not found');
            systemCustomView.requestSetName(customView.name);
            systemCustomView.requestSetType(customView.type);
            systemCustomView.requestSetFilters(new CustomViewFilters(customView.filters ?? []));
            systemCustomView.requestSetOrder(customView.sortOrder ?? '');
            systemCustomView.requestSetColumnsToDisplay(new CustomViewColumnsToDisplay(customView.columnsToDisplay ?? []));
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
      memberToReturn = new MemberConverter().toMongo(await repo.save(member));
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
      account.requestSetUser(userDo);
      account.requestSetFirstName(input.account.firstName);
      account.requestSetLastName(input.account.lastName);
      account.requestSetCreatedBy(currentUserDo);
      memberToReturn = new MemberConverter().toMongo(await repo.save(member));
    });
    return memberToReturn;
  }

  async memberAccountEdit(input: MemberAccountEditInput): Promise<Member> {
    let memberToReturn: Member;
    await this.withTransaction(async (repo) => {
      let member = await repo.getById(input.memberId);
      let account = member.accounts.find((a) => a.id === input.accountId);
      account.requestSetFirstName(input.firstName);
      account.requestSetLastName(input.lastName);
      memberToReturn = new MemberConverter().toMongo(await repo.save(member));
    });
    return memberToReturn;
  }

  async memberAccountRemove(input: MemberAccountRemoveInput): Promise<Member> {
    let memberToReturn: Member;
    await this.withTransaction(async (repo) => {
      let member = await repo.getById(input.memberId);
      let accountRef = member.accounts.find((a) => a.id === input.accountId);
      member.requestRemoveAccount(accountRef.props);
      memberToReturn = new MemberConverter().toMongo(await repo.save(member));
    });
    return memberToReturn;
  }
  
  async memberProfileUpdateAvatar(memberId: string, avatarDocumentId: string): Promise<Member> {
    let memberToReturn: Member;
    await this.withTransaction(async (repo) => {
      let member = await repo.getById(memberId);
      let profile = member.profile;
      profile.requestSetAvatarDocumentId(avatarDocumentId);
      memberToReturn = new MemberConverter().toMongo(await repo.save(member));
    });
    return memberToReturn;
  }

  async memberProfileUpdate(input: MemberProfileUpdateInput): Promise<Member> {
    let memberToReturn: Member;
    await this.withTransaction(async (repo) => {
      let member = await repo.getById(input.memberId);
      let profile = member.profile;
      profile.requestSetName(input.profile.name);
      profile.requestSetEmail(input.profile.email);
      profile.requestSetBio(input.profile.bio);
      profile.requestSetInterests(new Interests(input.profile.interests));
      profile.requestSetShowInterests(input.profile.showInterests);
      profile.requestSetShowEmail(input.profile.showEmail);
      profile.requestSetShowLocation(input.profile.showLocation);
      profile.requestSetShowProfile(input.profile.showProfile);
      profile.requestSetShowProperties(input.profile.showProperties);
      memberToReturn = new MemberConverter().toMongo(await repo.save(member));
    });
    return memberToReturn;
  }
}
