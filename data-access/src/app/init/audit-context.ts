import { AuditContextBase, AuditContextBaseImpl } from "../../../seedwork/infrastructure-seedwork/audit-context-base";
import { MemberEntityReference } from "../domain/contexts/community/member/member";
import { EndUserEntityReference } from "../domain/contexts/users/end-user/end-user";
import { StaffUserEntityReference } from "../domain/contexts/users/staff-user/staff-user";


export interface AuditContext extends AuditContextBase {
  funcToGetMemberRef?: () => MemberEntityReference
  funcToGetEndUserRef?: () => EndUserEntityReference
  funcToGetStaffUserRef?: () => StaffUserEntityReference
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

  get funcToGetMemberRef (): () => MemberEntityReference {
    return () => this.memberEntityReference;
  }

  get funcToGetEndUserRef (): () => EndUserEntityReference {
    return () => this.endUserEntityReference;
  }

  get funcToGetStaffUserRef (): () => StaffUserEntityReference {
    return () => this.staffUserEntityReference;
  }
}

export class ReadOnlyAuditContext extends AuditContextBaseImpl implements AuditContext {
  private constructor(){
    super();
    //prevent public construction
  }
  public static GetInstance(): AuditContext {
    return new ReadOnlyAuditContext();
  }
}

export class SystemAuditContext extends AuditContextBaseImpl implements AuditContext {
  private constructor(){
    super();
    //prevent public construction
  }
  public static GetInstance(): AuditContext {
    return new SystemAuditContext();
  }
}