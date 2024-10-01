import { AuditContextBase, AuditContextBaseImpl } from "../../../seedwork/infrastructure-seedwork/audit-context-base";
import { MemberEntityReference } from "../domain/contexts/community/member/member";
import { EndUserEntityReference } from "../domain/contexts/users/end-user/end-user";
import { StaffUserEntityReference } from "../domain/contexts/users/staff-user/staff-user";


// ======== Audit Context >>>>>>>
export interface AuditContext extends AuditContextBase {
  memberRef?: MemberEntityReference;
  endUserRef?: EndUserEntityReference;
  staffUserRef?: StaffUserEntityReference;
}

export class AuditContextImpl extends AuditContextBaseImpl implements AuditContext {
  constructor(
    private readonly memberEntityReference?: MemberEntityReference,
    private readonly staffUserEntityReference?: StaffUserEntityReference, 
    private readonly endUserEntityReference?: EndUserEntityReference, 
  ){
    super();
    if (!staffUserEntityReference && !endUserEntityReference) {
      throw new Error("Staff User or End User is required");
    }
  } 

  get memberRef ():  MemberEntityReference {
    return this.memberEntityReference;
  }

  get endUserRef (): EndUserEntityReference {
    return this.endUserEntityReference;
  }

  get staffUserRef (): StaffUserEntityReference {
    return this.staffUserEntityReference;
  }
}
// <<<<<<<< Audit Context ========




// ======== ReadOnly Audit Context >>>>>>>
export class ReadOnlyAuditContext extends AuditContextBaseImpl implements AuditContext {
  private constructor(){
    super();
    //prevent public construction
  }
  public static GetInstance(): AuditContext {
    return new ReadOnlyAuditContext();
  }
}
// <<<<<<<< ReadOnly Audit Context ========






// ======== System Audit Context >>>>>>>
export class SystemAuditContext extends AuditContextBaseImpl implements AuditContext {
  private constructor(){
    super();
    //prevent public construction
  }
  public static GetInstance(): AuditContext {
    return new SystemAuditContext();
  }
}
// <<<<<<<< System Audit Context ========




//  ======== Audit Context Factory >>>>>>>
export type FuncToGetMemberRefFromAuditContextFactory = (auditContext: AuditContext) => MemberEntityReference
export type FuncToGetEndUserRefFromAuditContextFactory = (auditContext: AuditContext) => EndUserEntityReference
export type FuncToGetStaffUserRefFromAuditContextFactory = (auditContext: AuditContext) => StaffUserEntityReference

export type AuditContextFactoryType = undefined | { //undefined - because the calling code will not pass in a factory; it will be added by the Audit decorator
  getMemberRef: FuncToGetMemberRefFromAuditContextFactory
  getEndUserRef: FuncToGetEndUserRefFromAuditContextFactory
  getStaffUserRef: FuncToGetStaffUserRefFromAuditContextFactory
}

export const AuditContextFactory: AuditContextFactoryType = {
  getMemberRef: (auditContext: AuditContext) => auditContext.memberRef || undefined,
  getEndUserRef: (auditContext: AuditContext) => auditContext.endUserRef || undefined,
  getStaffUserRef: (auditContext: AuditContext) => auditContext.staffUserRef || undefined,
}
// <<<<<<<< Audit Context Factory ========