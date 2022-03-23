import { CommunityEntityReference } from '../community/community';
import { MemberEntityReference } from '../community/member';
import { RoleEntityReference } from '../community/role';
import { UserEntityReference } from '../user/user';
import { CommunityVisa, CommunityVisaImpl } from './community-visa';
import { RoleVisaImpl } from './role-visa';
import { UserVisa, UserVisaImpl } from './user-visa';

export interface Visa{
  determineIf(func:((permissions) => boolean)) :  Promise<boolean> ;
}

export interface Passport {
  forCommunity(root: CommunityEntityReference):  CommunityVisa;
  forRole(root: RoleEntityReference): CommunityVisa;
  forUser(root: UserEntityReference):  UserVisa;
}

export class PassportImpl implements Passport {
  constructor(
    private readonly user: UserEntityReference, 
    private readonly member: MemberEntityReference
  ){
    if(!member.accounts.find(account => account.user.id === user.id)){
      throw new Error(`User ${user.id} is not a member of the community ${member.community.id}`);
    }
  } 

  forCommunity(root: CommunityEntityReference): CommunityVisa {
    return new CommunityVisaImpl(root,this.member);
  }
  forRole(root: RoleEntityReference): CommunityVisa {
    return new RoleVisaImpl(root,this.member);
  }
  forUser(root: UserEntityReference):  UserVisa {
    return new UserVisaImpl(root,this.user);
  }   
}

export class ReadOnlyPassport implements Passport {
  private constructor(){
    //prevent public construction
  }
  public static GetInstance(): Passport {
    return new ReadOnlyPassport();
  }

  forCommunity(root: CommunityEntityReference): CommunityVisa {
    return {determineIf: async () => false }; 
  }
  forRole(root: RoleEntityReference): CommunityVisa {
    return {determineIf: async () => false }; 
  }
  forUser(root: UserEntityReference): UserVisa {
    return {determineIf: async () => false }; 
  }
}
