import { MemberCreateInput, MemberUpdateInput, MemberAccountAddInput, MemberAccountEditInput, MemberAccountRemoveInput, MemberProfileUpdateInput, MemberProfileUpdateAvatarInput, MemberDomainApplicationService } from '../../app/application-services/domain/member.interface';
import { Interests } from '../../app/domain/contexts/community/profile.value-objects';
import { CustomViewColumnsToDisplay, CustomViewFilters } from '../../app/domain/contexts/community/custom-view.value-objects';
import { Member, MemberProps } from '../../app/domain/contexts/community/member';
import { MemberRepository } from '../../app/domain/contexts/community/member.repository';
import { DomainApplicationServiceImpl } from './_domain.application-service';
import { BaseApplicationServiceExecutionContext } from '../_base.application-service';
import { CommunityEntityReference } from '../../app/domain/contexts/community/community';
import { RoleEntityReference } from '../../app/domain/contexts/community/role';
import { UserEntityReference } from '../../app/domain/contexts/user/user';

type PropType = MemberProps;
type Root = Member<PropType>;
type RepoType = MemberRepository<PropType>;

export class MemberDomainApplicationServiceImpl<Context extends BaseApplicationServiceExecutionContext> 
  extends DomainApplicationServiceImpl<Context, PropType, Root, RepoType> 
  implements MemberDomainApplicationService
{
  async memberCreate(input: MemberCreateInput): Promise<Root> {
    console.log(`memberCreate`, this.context.verifiedUser);
    if (this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:memberCreate');
    }

    let memberToReturn: Root;
    let community = await this.context.applicationServices.communityDataApi.getCommunityById(this.context.communityId);
    let communityDo = community as CommunityEntityReference; //new CommunityConverter().toDomain(community, { passport: ReadOnlyPassport.GetInstance() });

    await this.withTransaction(async (repo) => {
      let newMember = await repo.getNewInstance(input.memberName, communityDo);
      memberToReturn = await repo.save(newMember);
    });
    return memberToReturn;
  }

  async memberUpdate(input: MemberUpdateInput): Promise<Root> {
    let memberToReturn: Root;
    let roleDo;
    if (input.role !== undefined) {
      let role = await this.context.applicationServices.roleDataApi.getRoleById(input.role);
      roleDo = role as RoleEntityReference; //new RoleConverter().toDomain(mongoRole, { passport: ReadOnlyPassport.GetInstance() });
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
      memberToReturn = await repo.save(member);
    });
    return memberToReturn;
  }

  async memberAccountAdd(input: MemberAccountAddInput): Promise<Root> {
    let memberToReturn: Root;

    let accountUser = await this.context.applicationServices.userDataApi.getUserById(input.account.user);
    let accountUserDo = accountUser as UserEntityReference; //new UserConverter().toDomain(mongoUser, { passport: ReadOnlyPassport.GetInstance() });

    let currentUser = await this.context.applicationServices.userDataApi.getByExternalId(this.context.verifiedUser.verifiedJWT.sub);
    let currentUserDo = currentUser as UserEntityReference; //new UserConverter().toDomain(currentMongoUser, { passport: ReadOnlyPassport.GetInstance() });

    await this.withTransaction(async (repo) => {
      let member = await repo.getById(input.memberId);
      let account = member.requestNewAccount();
      account.user=(accountUserDo);
      account.firstName=input.account.firstName;
      account.lastName=(input.account.lastName);
      account.createdBy=(currentUserDo);
      memberToReturn = await repo.save(member);
    });
    return memberToReturn;
  }

  async memberAccountEdit(input: MemberAccountEditInput): Promise<Root> {
    let memberToReturn: Root;
    await this.withTransaction(async (repo) => {
      let member = await repo.getById(input.memberId);
      let account = member.accounts.find((a) => a.id === input.accountId);
      account.firstName=input.firstName;
      account.lastName=input.lastName;
      memberToReturn = await repo.save(member);
    });
    return memberToReturn;
  }

  async memberAccountRemove(input: MemberAccountRemoveInput): Promise<Root> {
    let memberToReturn: Root;
    await this.withTransaction(async (repo) => {
      let member = await repo.getById(input.memberId);
      let accountRef = member.accounts.find((a) => a.id === input.accountId);
      member.requestRemoveAccount(accountRef.props);
      memberToReturn = await repo.save(member);
    });
    return memberToReturn;
  }
  
  async memberProfileUpdateAvatar(input: MemberProfileUpdateAvatarInput): Promise<Root> {
    let memberToReturn: Root;
    await this.withTransaction(async (repo) => {
      let member = await repo.getById(input.memberId);
      let profile = member.profile;
      profile.AvatarDocumentId=(input.avatarDocumentId);
      memberToReturn = await repo.save(member);
    });
    return memberToReturn;
  }

  async memberProfileUpdate(input: MemberProfileUpdateInput): Promise<Root> {
    let memberToReturn: Root;
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
      memberToReturn = await repo.save(member);
    });
    return memberToReturn;
  }
}
