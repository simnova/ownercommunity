import { Member } from '../../domain/contexts/community/member';
import { ReadOnlyDomainVisa } from '../../domain/contexts/iam/domain-visa';
import {
  MemberAccountAddInput,
  MemberAccountRemoveInput,
  MemberCreateInput,
  MemberProfileUpdateInput,
  MemberUpdateInput,
  MemberAccountEditInput,
} from '../../external-dependencies/graphql-api';
import { DomainDataSource } from './domain-data-source';
import { Interests } from '../../domain/contexts/community/profile.value-objects';
import { CustomViewColumnsToDisplay, CustomViewFilters } from '../../domain/contexts/community/custom-view.value-objects';
import { CommunityConverter, MemberConverter, MemberDomainAdapter, MemberRepository, RoleConverter, UserConverter } from '../../external-dependencies/domain';
import { MemberData } from '../../external-dependencies/datastore';
import { MemberDomainApi } from '../../application-services/domain';
import { AppContext } from '../../init/app-context-builder';

type PropType = MemberDomainAdapter;
type DomainType = Member<PropType>;
type RepoType = MemberRepository<PropType>;

export class MemberDomainApiImpl extends DomainDataSource<AppContext, MemberData, PropType, DomainType, RepoType> implements MemberDomainApi {
  async memberCreate(input: MemberCreateInput): Promise<MemberData> {
    console.log(`memberCreate`, this.context.verifiedUser);
    if (this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:memberCreate');
    }

    let memberToReturn: MemberData;
    let community = await this.context.applicationServices.communityDataApi.getCommunityById(this.context.communityId);
    let communityDo = new CommunityConverter().toDomain(community, { domainVisa: ReadOnlyDomainVisa.GetInstance() });

    await this.withTransaction(async (repo) => {
      let newMember = await repo.getNewInstance(input.memberName, communityDo);
      memberToReturn = new MemberConverter().toPersistence(await repo.save(newMember));
    });
    return memberToReturn;
  }

  async memberUpdate(input: MemberUpdateInput): Promise<MemberData> {
    let memberToReturn: MemberData;
    let roleDo;
    if (input.role !== undefined) {
      let mongoRole = await this.context.applicationServices.roleDataApi.getRoleById(input.role);
      roleDo = new RoleConverter().toDomain(mongoRole, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
    }
    await this.withTransaction(async (repo) => {
      let member = await repo.getById(input.id);
      member.CyberSourceCustomerId = input?.cybersourceCustomerId;
      if (input.memberName !== undefined) member.MemberName = input.memberName;
      if (roleDo !== undefined) member.Role = roleDo;
      if (input.customViews !== undefined) {
        let systemCustomViews = member.customViews;
        let updatedCustomViews = input.customViews;
        updatedCustomViews.forEach((customView) => {
          // add new custom view
          if (!customView.id) {
            let newCustomView = member.requestNewCustomView();
            newCustomView.name = customView.name;
            newCustomView.type = customView.type;
            newCustomView.filters = new CustomViewFilters(customView.filters ?? []);
            newCustomView.order = customView.sortOrder ?? '';
            newCustomView.columnsToDisplay = new CustomViewColumnsToDisplay(customView.columnsToDisplay ?? []);
          } else {
            // update existing custom view
            let systemCustomView = systemCustomViews.find((c) => c.id === customView.id);
            if (systemCustomView === undefined) throw new Error('Custom view not found');
            systemCustomView.name = customView.name;
            systemCustomView.type = customView.type;
            systemCustomView.filters = new CustomViewFilters(customView.filters ?? []);
            systemCustomView.order = customView.sortOrder ?? '';
            systemCustomView.columnsToDisplay = new CustomViewColumnsToDisplay(customView.columnsToDisplay ?? []);
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

  async memberAccountAdd(input: MemberAccountAddInput): Promise<MemberData> {
    let memberToReturn: MemberData;

    let mongoUser = await this.context.applicationServices.userDataApi.getUserById(input.account.user);
    let userDo = new UserConverter().toDomain(mongoUser, { domainVisa: ReadOnlyDomainVisa.GetInstance() });

    let currentMongoUser = await this.context.applicationServices.userDataApi.getUserByExternalId(this.context.verifiedUser.verifiedJWT.sub);
    let currentUserDo = new UserConverter().toDomain(currentMongoUser, { domainVisa: ReadOnlyDomainVisa.GetInstance() });

    await this.withTransaction(async (repo) => {
      let member = await repo.getById(input.memberId);
      let account = member.requestNewAccount();
      account.user = userDo;
      account.firstName = input.account.firstName;
      account.lastName = input.account.lastName;
      account.createdBy = currentUserDo;
      memberToReturn = new MemberConverter().toPersistence(await repo.save(member));
    });
    return memberToReturn;
  }

  async memberAccountEdit(input: MemberAccountEditInput): Promise<MemberData> {
    let memberToReturn: MemberData;
    await this.withTransaction(async (repo) => {
      let member = await repo.getById(input.memberId);
      let account = member.accounts.find((a) => a.id === input.accountId);
      account.firstName = input.firstName;
      account.lastName = input.lastName;
      memberToReturn = new MemberConverter().toPersistence(await repo.save(member));
    });
    return memberToReturn;
  }

  async memberAccountRemove(input: MemberAccountRemoveInput): Promise<MemberData> {
    let memberToReturn: MemberData;
    await this.withTransaction(async (repo) => {
      let member = await repo.getById(input.memberId);
      let accountRef = member.accounts.find((a) => a.id === input.accountId);
      member.requestRemoveAccount(accountRef.props);
      memberToReturn = new MemberConverter().toPersistence(await repo.save(member));
    });
    return memberToReturn;
  }

  async memberProfileUpdateAvatar(memberId: string, avatarDocumentId: string): Promise<MemberData> {
    let memberToReturn: MemberData;
    await this.withTransaction(async (repo) => {
      let member = await repo.getById(memberId);
      let profile = member.profile;
      profile.AvatarDocumentId = avatarDocumentId;
      memberToReturn = new MemberConverter().toPersistence(await repo.save(member));
    });
    return memberToReturn;
  }

  async memberProfileUpdate(input: MemberProfileUpdateInput): Promise<MemberData> {
    let memberToReturn: MemberData;
    await this.withTransaction(async (repo) => {
      let member = await repo.getById(input.memberId);
      let profile = member.profile;
      profile.Name = input.profile.name;
      profile.Email = input.profile.email;
      profile.Bio = input.profile.bio;
      profile.Interests = new Interests(input.profile.interests);
      profile.ShowInterests = input.profile.showInterests;
      profile.ShowEmail = input.profile.showEmail;
      profile.ShowLocation = input.profile.showLocation;
      profile.ShowProfile = input.profile.showProfile;
      profile.ShowProperties = input.profile.showProperties;
      memberToReturn = new MemberConverter().toPersistence(await repo.save(member));
    });
    return memberToReturn;
  }
}
