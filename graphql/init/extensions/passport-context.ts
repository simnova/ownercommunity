import { PassportImpl, ReadOnlyPassport } from "../../../domain/contexts/iam/passport";
import { Context } from "../../context";

import { UserConverter } from '../../../domain/infrastructure/persistence/user.domain-adapter';
import { MemberConverter } from '../../../domain/infrastructure/persistence/member.domain-adapter';
import { CommunityConverter } from '../../../domain/infrastructure/persistence/community.domain-adapter';
import { HttpRequest } from "@azure/functions";
import { Community, CommunityModel } from "../../../infrastructure/data-sources/cosmos-db/models/community";
import { isValidObjectId } from "mongoose";
import { UserModel } from "../../../infrastructure/data-sources/cosmos-db/models/user";
import { MemberModel } from "../../../infrastructure/data-sources/cosmos-db/models/member";
import { PortalTokenValidation } from "./portal-token-validation";
import * as util from './util';

export class PassportContext {
  context: Partial<Context>;

  constructor(
    private req: HttpRequest,
    context: Partial<Context>,
    private portalTokenValidator: PortalTokenValidation,
  ) { this.context = context; }

  static async decorateContext(context: Partial<Context>, req: HttpRequest, portalTokenValidator: PortalTokenValidation): Promise<void> {
    try{
      const passportContext = new PassportContext(
        req,
        context,
        portalTokenValidator
      );
      await passportContext.setContextVerifiedJwt();
      await passportContext.setContextPassport();
    }catch(error){
      console.log(' == ERROR 2== ', error);
      context.passport = ReadOnlyPassport.GetInstance();
      context.community = null;
    }

  }

  private async setContextVerifiedJwt(): Promise<void> {
    let bearerToken = util.ExtractBearerToken(this.req);
    if (bearerToken) {
      console.log('[BearerToken] ', bearerToken);
      let verifiedUser = await this.portalTokenValidator.GetVerifiedUser(bearerToken);
      console.log('Decorating context with verified user:', JSON.stringify(verifiedUser));
      if (verifiedUser) {
        this.context.verifiedUser = verifiedUser;
      }
    }
  }

  private async setContextPassport(): Promise<void> {
    let communityHeader = this.req.headers['community'];
    if (communityHeader) {
      let mongoCommunity = await this.getCommunityByHeader(communityHeader);
      if (this.context.verifiedUser && this.context.verifiedUser.verifiedJWT && this.context.verifiedUser.verifiedJWT.sub && mongoCommunity) {
        this.context.passport = await this.getPassport(this.context, mongoCommunity);
        this.context.community = mongoCommunity.id;
        console.log(' == CONTEXT DECORATED SUCCESSFULLY == ');
        return;
      }
    }
    this.context.passport = ReadOnlyPassport.GetInstance();
    this.context.community = null;
  }

  private async getCommunityByHeader( header: string): Promise<Community>  {
    if(isValidObjectId(header)) {
      console.log('valid header!objectId');
      return CommunityModel.findById(header);
    }
    return CommunityModel.findOne({
      $or: [
        {handle: header},
        {domain: header},
        {whileLabelDomain: header}
      ]
      });
  }

  private async getPassport(context: Partial<Context>, mongoCommunity: Community) {
    let readOnlyPassport = ReadOnlyPassport.GetInstance();
    let userExternalId = context.verifiedUser.verifiedJWT.sub;
    let mongoUser = await UserModel.findOne({externalId:userExternalId}).exec();
    let mongoMember = (
        await (MemberModel
          .findOne({community: mongoCommunity.id, 'accounts.user': mongoUser.id})
          .populate('community')
          .populate('accounts.user')
          .populate('role')
          .exec())
        )
  
    if(mongoCommunity && mongoMember && mongoUser) {
      let userDo = new UserConverter().toDomain(mongoUser, {passport: readOnlyPassport});
      let memberDo = new MemberConverter().toDomain(mongoMember,{passport: readOnlyPassport});
      let communityDo = new CommunityConverter().toDomain(mongoCommunity, {passport: readOnlyPassport});
      return new PassportImpl(userDo, memberDo, communityDo);
    }
    console.log(' == ERROR == ');
    console.log('verifiedUser: ', context.verifiedUser, ' community: ', mongoCommunity);
    return readOnlyPassport;
  }
}

// export const decorateContext = async (context: Partial<Context>, req:HttpRequest): Promise<void> => {
//   let communityHeader = req.headers['community'];
//   if(!communityHeader || communityHeader === '') {
//     console.log(' == ERROR 0== ', context);
//     context.passport = ReadOnlyPassport.GetInstance();
//     context.community = null;
//   }
//   let mongoCommunity = await getCommunityByHeader(communityHeader);
//   if(
//     !context.verifiedUser || 
//     !context.verifiedUser.verifiedJWT ||
//     !context.verifiedUser.verifiedJWT.sub ||
//     !mongoCommunity
//     ) {
//       console.log(' == ERROR 1== ', mongoCommunity, context);
//       context.passport = ReadOnlyPassport.GetInstance();
//       context.community = null;
//   }
//   try {
//     context.passport = await getPassport(context, mongoCommunity);
//     context.community = mongoCommunity.id;   
//     console.log(' == CONTEXT DECORATED SUCCESSFULLY == ');
//   } catch (error) {
//     console.log(' == ERROR 2== ', error);
//     context.passport = ReadOnlyPassport.GetInstance();
//     context.community = null;
//   }
// }