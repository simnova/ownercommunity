import { DomainVisaImpl, ReadOnlyDomainVisa } from '../domain/domain.visa';
import { UserEntityReference } from '../domain/contexts/user/user/user';
import { MemberEntityReference } from '../domain/contexts/community/member/member';
import { CommunityEntityReference } from '../domain/contexts/community/community/community';
import { ApplicationServices } from '../application-services';
import { InfrastructureServices } from '../infrastructure-services';
// import { DomainExecutionContext } from '../domain/contexts/domain-execution-context';
import { CommunityData } from '../external-dependencies/datastore';
import { ApplicationServicesBuilder } from './application-services-builder';
import { Passport } from './passport';
import { DatastoreVisaImpl, ReadOnlyDatastoreVisaImpl } from '../datastore/datastore.visa';

export type VerifiedUser = {
  verifiedJWT: any;
  openIdConfigKey: string;
};

export interface AppContext{  // extends DomainExecutionContext {
  verifiedUser: VerifiedUser;
  communityId: string;
  memberId: string;
  passport: Passport;
  applicationServices: ApplicationServices;
  infrastructureServices: InfrastructureServices;
  init(): Promise<void>;
}

export class AppContextBuilder implements AppContext {
  private _verifiedUser: VerifiedUser;
  private _communityHeader: string;
  private _memberId: string;
  private _communityData: CommunityData;
  private _passport: Passport;
  private _applicationServices: ApplicationServices;
  private _infrastructureServices: InfrastructureServices;

  constructor(
    verifiedUser: VerifiedUser, 
    communityHeader: string,
    memberId: string,
    infrastructureServices: InfrastructureServices
    ) {
      this._verifiedUser = verifiedUser;
      this._communityHeader = communityHeader;
      this._memberId = memberId;
      this._applicationServices = new ApplicationServicesBuilder(this);
      this._infrastructureServices = infrastructureServices;
  }

  get verifiedUser(): VerifiedUser {
    return this._verifiedUser;
  }

  get communityId(): string {
    return this._communityData.id;
  }

  get memberId(): string {
    return this._memberId;
  }

  get passport(): Passport {
    return this._passport;
  }

  get applicationServices(): ApplicationServices {
    return this._applicationServices;
  }

  get infrastructureServices(): InfrastructureServices {
    return this._infrastructureServices;
  }

  async init(): Promise<void> {
    await this.setDefaultPassport();
    await this.setCommunityData();
    await this.setPassport();
    console.log(' app context initialized ...');
  }

  private async setDefaultPassport(): Promise<void> {
    this._passport = {
      domainVisa: ReadOnlyDomainVisa.GetInstance(),
      datastoreVisa: ReadOnlyDatastoreVisaImpl.GetInstance()
    }
  }

  private async setCommunityData(): Promise<void> {
    if (this._communityHeader) {
      this._communityData = await this._applicationServices.community.dataApi.getCommunityByHeader(this._communityHeader);
    }
  }

  private async setPassport(): Promise<void> {
    let userExternalId = this._verifiedUser?.verifiedJWT.sub;
    if (userExternalId && this._communityData) {
      let userData = await this._applicationServices.user.dataApi.getUserByExternalId(userExternalId);
      let memberData = (await this._applicationServices.member.dataApi.getMemberByIdWithCommunityAccountRole(this._memberId));
      if(memberData && userData) {
        if (!(memberData.accounts.find((account) => account.user.id === userData.id && memberData.community.id === this._communityData.id))) {  
          throw new Error('user is not related to member');
        }
        this._passport = {
          domainVisa :new DomainVisaImpl(userData as UserEntityReference, memberData as MemberEntityReference, this._communityData as CommunityEntityReference),
          datastoreVisa: new DatastoreVisaImpl(userData, memberData)
        }
      }
    }
  }
}
