import { DomainVisaImpl, ReadOnlyDomainVisa, SystemDomainVisa } from '../domain/domain.visa';
import { MemberEntityReference } from '../domain/contexts/community/member/member';
import { CommunityEntityReference } from '../domain/contexts/community/community/community';
import {StaffUserEntityReference } from '../domain/contexts/users/staff-user/staff-user';
import { EndUserEntityReference } from '../domain/contexts/users/end-user/end-user';
import { ApplicationServices } from '../application-services';
import { InfrastructureServices } from '../infrastructure-services';
import { CommunityData, MemberData } from '../external-dependencies/datastore';
import { ApplicationServicesBuilder } from './application-services-builder';
import { Passport } from './passport';
import { DatastoreVisaImpl, ReadOnlyDatastoreVisaImpl, SystemDatastoreVisaImpl } from '../datastore/datastore.visa';

export enum OpenIdConfigKeyEnum {
  ACCOUNT_PORTAL = 'AccountPortal',
  STAFF_PORTAL = 'StaffPortal',
  SYSTEM = 'System',
}

export interface VerifiedJwtPayloadType{
  name: string;
  given_name: string;
  family_name: string;
  email: string;
  sub: string;
  oid?: string;
  unique_name?: string;
}

export type VerifiedUser = {
  verifiedJWT: VerifiedJwtPayloadType;
  openIdConfigKey: OpenIdConfigKeyEnum;
};

export interface AppContext{  // extends DomainExecutionContext {
  verifiedUser: VerifiedUser;
  member: MemberData;
  community: CommunityData;
  passport: Passport;
  applicationServices: ApplicationServices;
  infrastructureServices: InfrastructureServices;
}

export abstract class AppContextBuilder implements AppContext {
  private _verifiedUser: VerifiedUser;
  private _communityHeader: string;
  private _memberHeader: string;
  private _communityData: CommunityData;
  private _memberData: MemberData;
  private _passport: Passport;
  private _applicationServices: ApplicationServices;
  private _infrastructureServices: InfrastructureServices;

  constructor(
    infrastructureServices: InfrastructureServices
    ) {
      this._applicationServices = new ApplicationServicesBuilder(this);
      this._infrastructureServices = infrastructureServices;
  }

  get verifiedUser(): VerifiedUser {
    return this._verifiedUser;
  }

  get community(): CommunityData {
    return this._communityData;
  }

  get member(): MemberData {
    return this._memberData;
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

  protected async initializeAppContext(
    verifiedUser: VerifiedUser, 
    communityHeader: string,
    memberHeader: string,
  ): Promise<void> {
    this._verifiedUser = verifiedUser;
    this._communityHeader = communityHeader;
    this._memberHeader = memberHeader;
    await this.setDefaultPassport();
    await this.setCurrentData();
    await this.setPassport();
    console.log(' app context initialized ...');
  }

  private async setDefaultPassport(): Promise<void> {
    this._passport = {
      domainVisa: ReadOnlyDomainVisa.GetInstance(),
      datastoreVisa: ReadOnlyDatastoreVisaImpl.GetInstance()
    }
  }

  private async setCurrentData(): Promise<void> {
    if (this._communityHeader) {
      this._communityData = await this._applicationServices.community.dataApi.getCommunityByHeader(this._communityHeader);
    }
    if (this._memberHeader) {
      this._memberData = await this._applicationServices.member.dataApi.getMemberById(this._memberHeader);
    }
  }

  private async setPassport(): Promise<void> {
    if(this._verifiedUser?.openIdConfigKey === OpenIdConfigKeyEnum.SYSTEM) {
      this._passport = {
        domainVisa: SystemDomainVisa.GetInstance(),
        datastoreVisa: SystemDatastoreVisaImpl.GetInstance()
      };
      return;
    }

    if (this._verifiedUser?.openIdConfigKey === OpenIdConfigKeyEnum.STAFF_PORTAL) {
      let userData = await this._applicationServices.users.staffUser.dataApi.getUserByExternalId(this._verifiedUser.verifiedJWT.oid);
      if(userData) {
        this._passport = {
          domainVisa: new DomainVisaImpl(userData as StaffUserEntityReference, null, null),
          datastoreVisa: new DatastoreVisaImpl(userData, null)
        }
      }
      return;
    }

    let userExternalId = this._verifiedUser?.verifiedJWT.sub;
    if (userExternalId && this._communityData) {
      let userData = await this._applicationServices.users.endUser.dataApi.getUserByExternalId(userExternalId);
      let memberData = (await this._applicationServices.member.dataApi.getMemberByIdWithCommunityAccountRole(this._memberHeader));
      if(memberData && userData) {
        if (!(memberData.accounts.find((account) => account.user.id === userData.id && memberData.community.id === this._communityData.id))) {  
          throw new Error('user is not related to member');
        }
        this._passport = {
          domainVisa :new DomainVisaImpl(userData as EndUserEntityReference, memberData as MemberEntityReference, this._communityData as CommunityEntityReference),
          datastoreVisa: new DatastoreVisaImpl(userData, memberData)
        }
      }
    }
  }

}
