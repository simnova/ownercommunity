import { DomainDataSource } from "../../data-sources/domain-data-source";
import { CommunityVisa } from "../../domain/contexts/community/community.visa";
import { Member } from "../../domain/contexts/community/member/member";
import { ReadOnlyDomainExecutionContext } from "../../domain/domain-execution-context";
import { ReadOnlyDomainVisa } from "../../domain/domain.visa";
import { MemberData } from "../../external-dependencies/datastore";
import { MemberDomainAdapter, CommunityConverter, MemberConverter, EndUserRoleConverter, EndUserConverter, MemberRepository } from "../../external-dependencies/domain";
import { MemberAccountAddInput, MemberAccountEditInput, MemberAccountRemoveInput, MemberCreateInput, MemberProfileUpdateInput, MemberUpdateInput } from "../../external-dependencies/graphql-api";
import { AppContext } from "../../init/app-context-builder";
import { ReadOnlyInfrastructureContext } from "../../init/infrastructure-context";

export interface MemberDomainApi {
  memberCreate(input: MemberCreateInput) : Promise<MemberData>;
  memberUpdate(input: MemberUpdateInput) : Promise<MemberData>;
  memberAccountAdd(input: MemberAccountAddInput) : Promise<MemberData>;
  memberAccountEdit(input: MemberAccountEditInput) : Promise<MemberData>;
  memberAccountRemove(input: MemberAccountRemoveInput) : Promise<MemberData>;
  memberProfileUpdate(input: MemberProfileUpdateInput) : Promise<MemberData>;
  memberProfileUpdateAvatar(memberId: string, avatarDocumentId: string) : Promise<MemberData>;
}

type PropType = MemberDomainAdapter;
type DomainType = Member<PropType>;
type RepoType = MemberRepository<PropType>;

export class MemberDomainApiImpl extends DomainDataSource<AppContext, MemberData, PropType, CommunityVisa, DomainType, RepoType> implements MemberDomainApi {
  async memberCreate(input: MemberCreateInput): Promise<MemberData> {
    console.log(`memberCreate`, this.context.verifiedUser);
    if (this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:memberCreate');
    }

    let memberToReturn: MemberData;
    let community = await this.context.applicationServices.community.dataApi.getCommunityById(this.context.community?.id);
    let communityDo = new CommunityConverter().toDomain(community, ReadOnlyInfrastructureContext(), ReadOnlyDomainExecutionContext());

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
      let mongoRole = await this.context.applicationServices.roles.endUserRole.dataApi.getRoleById(input.role);
      roleDo = new EndUserRoleConverter().toDomain(mongoRole, ReadOnlyInfrastructureContext(), ReadOnlyDomainExecutionContext());
    }
    await this.withTransaction(async (repo) => {
      let member = await repo.getById(input.id);
      if (input.cybersourceCustomerId !== undefined) member.CyberSourceCustomerId = input?.cybersourceCustomerId;
      if (input.memberName !== undefined) member.MemberName = input.memberName;
      if (roleDo !== undefined) member.Role = roleDo;
      if (input.customViews !== undefined) {
        let systemCustomViews = member.customViews;
        let updatedCustomViews = input.customViews;
        updatedCustomViews.forEach((customView) => {
          // add new custom view
          if (!customView.id) {
            let newCustomView = member.requestNewCustomView();
            newCustomView.Name = customView.name;
            newCustomView.Type = customView.type;
            newCustomView.Filters = customView.filters ?? [];
            newCustomView.Order = customView.sortOrder ?? '';
            newCustomView.ColumnsToDisplay = customView.columnsToDisplay ?? [];
          } else {
            // update existing custom view
            let systemCustomView = systemCustomViews.find((c) => c.id === customView.id);
            if (systemCustomView === undefined) throw new Error('Custom view not found');
            systemCustomView.Name = customView.name;
            systemCustomView.Type = customView.type;
            systemCustomView.Filters = customView.filters ?? [];
            systemCustomView.Order = customView.sortOrder ?? '';
            systemCustomView.ColumnsToDisplay = customView.columnsToDisplay ?? [];
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

    let mongoUser = await this.context.applicationServices.users.endUser.dataApi.getUserById(input.account.user);
    let userDo = new EndUserConverter().toDomain(mongoUser, ReadOnlyInfrastructureContext(), ReadOnlyDomainExecutionContext());

    let currentMongoUser = await this.context.applicationServices.users.endUser.dataApi.getUserByExternalId(this.context.verifiedUser.verifiedJWT.sub);
    let currentUserDo = new EndUserConverter().toDomain(currentMongoUser, ReadOnlyInfrastructureContext(), ReadOnlyDomainExecutionContext());

    await this.withTransaction(async (repo) => {
      let member = await repo.getById(input.memberId);
      let account = member.requestNewAccount();
      account.User = (userDo);
      account.FirstName = (input.account.firstName);
      account.LastName = (input.account.lastName);
      account.CreatedBy = (currentUserDo);
      memberToReturn = new MemberConverter().toPersistence(await repo.save(member));
    });
    return memberToReturn;
  }

  async memberAccountEdit(input: MemberAccountEditInput): Promise<MemberData> {
    let memberToReturn: MemberData;
    await this.withTransaction(async (repo) => {
      let member = await repo.getById(input.memberId);
      let account = member.accounts.find((a) => a.id === input.accountId);
      account.FirstName = (input.firstName);
      if (input.lastName !== undefined) account.LastName = (input.lastName);
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
      profile.Interests = input.profile.interests;
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
