import { UserModel } from "../../../infrastructure/data-sources/cosmos-db/models/user";
import { UserDomainAdapter } from "./adapters/user-domain-adapter";
import { User as UserDO } from "../../contexts/user/user";

import { MemberModel } from "../../../infrastructure/data-sources/cosmos-db/models/member";
import { MemberDomainAdapter } from "./adapters/member-domain-adapter";
import { Member as MemberDO } from "../../contexts/community/member";

import { PassportImpl, ReadOnlyPassport } from "../../contexts/iam/passport";
import { DomainExecutionContext } from "../../contexts/context";

//export const SystemExecutionContext = async ():Promise<DomainExecutionContext> => {return { passport: await PassportImpl.forSystem()} };

export const ExecutionContext = async (userId:string, communityId:string): Promise<DomainExecutionContext> => { 
  const mongoUser = await UserModel.findById(userId).exec();
  const userAdapter = new UserDomainAdapter(mongoUser) 
  const domainUser = new UserDO(userAdapter, {passport: ReadOnlyPassport.GetInstance()});

  const mongoMember = await MemberModel.findOne({community: communityId}).exec();
  const memberAdapter = new MemberDomainAdapter(mongoMember);
  const domainMember = new MemberDO(memberAdapter, {passport: ReadOnlyPassport.GetInstance()});

  const passport = new PassportImpl(domainUser,domainMember);
  const context:DomainExecutionContext = {
    passport: passport,
  }
  return context;
}