import { Passport, PassportImpl, ReadOnlyPassport } from "@app/core/domain/contexts/iam/passport";
import { UserEntityReference } from "@app/core/domain/contexts/user/user";
import { MemberEntityReference } from "@app/core/domain/contexts/community/member";
import { CommunityDataStructure } from "@app/core/application-services/datastore";
import { CommunityEntityReference } from "@app/core/domain/contexts/community/community";
import { ApplicationServices } from "@app/core/application-services";
import { InfrastructureServices } from "@app/core/infrastructure-services";
import { BaseApplicationServiceExecutionContext } from "@app/application-services-impl/_base.application-service";

export type VerifiedUser = {
  verifiedJWT: any;
  openIdConfigKey: string;
};

export interface Context extends BaseApplicationServiceExecutionContext{
  verifiedUser: VerifiedUser;
  community: string;
  passport: Passport;
  applicationServices: ApplicationServices;
  infrastructureServices: InfrastructureServices;
  init(): Promise<void>;
}

export class ContextBuilder implements Context {
  private _verifiedUser: VerifiedUser;
  private _communityHeader: string;
  private _communityData: CommunityDataStructure
  private _passport: Passport;
  private _applicationServices: ApplicationServices;
  private _infrastructureServices: InfrastructureServices;

  constructor(
    verifiedUser: VerifiedUser, 
    communityHeader: string,
    applicationServices: ApplicationServices,
    infrastructureServices: InfrastructureServices
    ) {
      this._verifiedUser = verifiedUser;
      this._communityHeader = communityHeader;
      this._applicationServices = applicationServices;
      this._infrastructureServices = infrastructureServices;
  }

  get verifiedUser(): VerifiedUser {
    return this._verifiedUser;
  }

  get community(): string {
    return this._communityData.id;
  }

  get passport(): any {
    return this._passport;
  }

  get applicationServices(): any {
    return this._applicationServices;
  }

  get infrastructureServices(): any {
    return this._infrastructureServices;
  }

  async init(): Promise<void> {
    await this.setCommunityData();
    await this.setPassport();
  }

  private async setCommunityData(): Promise<void>{
    if (this._communityHeader) {
      this._communityData = await this._applicationServices.communityDataApi.getCommunityByHeader(this._communityHeader);
    }
    this._communityData = null;
  }

  private async setPassport(): Promise<void> {
    let userExternalId = this._verifiedUser.verifiedJWT.sub;
    if(userExternalId && this._communityData) {
      let userData = await this._applicationServices.userDataApi.getByExternalId(userExternalId);
      let memberData = await this._applicationServices.memberDataApi.getMemberByCommunityAccountWithCommunityAccountRole(this._communityData.id, userData.id);
      if(memberData && userData) {
        this._passport = new PassportImpl(userData as UserEntityReference, memberData as MemberEntityReference, this._communityData as CommunityEntityReference);
      }
    }
    console.log(' == ERROR == verifiedUser: ', this._verifiedUser, ' community: ', this._communityData);
    this._passport = ReadOnlyPassport.GetInstance();
  }
}