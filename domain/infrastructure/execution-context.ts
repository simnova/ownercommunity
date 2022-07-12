import { UserModel } from "../../infrastructure/data-sources/cosmos-db/models/user";
import { UserDomainAdapter } from "./persistence/user.domain-adapter";
import { User as UserDO } from "../contexts/user/user";

import { MemberModel } from "../../infrastructure/data-sources/cosmos-db/models/member";
import { MemberDomainAdapter } from "./persistence/member.domain-adapter";
import { Member as MemberDO } from "../contexts/community/member";

import { PassportImpl, ReadOnlyPassport, SystemPassport } from "../contexts/iam/passport";
import { DomainExecutionContext } from "../contexts/context";


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

export const SystemExecutionContext = ():DomainExecutionContext => {
  const context:DomainExecutionContext = {
    passport: SystemPassport.GetInstance(),
  }
  return context;
}

export const ReadOnlyContext = ():DomainExecutionContext => {
  const context:DomainExecutionContext = {
    passport: ReadOnlyPassport.GetInstance(),
  }
  return context;
}