import { StaffUser } from '../../../models/users/staff-user';
import { DomainExecutionContext } from '../../../../../../../framework/domain/domain-execution-context';
import { StaffUser as StaffUserDO, StaffUserProps } from '../../../../../../app/domain/contexts/users/staff-user/staff-user';
import { MongooseDomainAdapter } from '../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-domain-adapter';
import { MongoTypeConverter } from '../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-type-converter';
import { StaffRoleDomainAdapter } from '../../roles/staff-role/staff-role.domain-adapter';
import { StaffRoleEntityReference } from '../../../../../../app/domain/contexts/community/roles/staff-role/staff-role';

export class StaffUserConverter extends MongoTypeConverter<DomainExecutionContext, StaffUser, StaffUserDomainAdapter, StaffUserDO<StaffUserDomainAdapter>> {
  constructor() {
    super(StaffUserDomainAdapter, StaffUserDO);
  }
}

export class StaffUserDomainAdapter extends MongooseDomainAdapter<StaffUser> implements StaffUserProps {
  get role(): StaffRoleEntityReference {
    if (this.doc.role) {
      return new StaffRoleDomainAdapter(this.doc.role);
    }
    return undefined;
  }
  setRoleRef(role: StaffRoleEntityReference): void {
    this.doc.set('role', role.id); 
  }

  get externalId() {
    return this.doc.externalId;
  }
  set externalId(externalId) {
    this.doc.externalId = externalId;
  }

  get displayName() {
    return this.doc.displayName;
  }
  set displayName(displayName) {
    this.doc.displayName = displayName;
  }

  get accessBlocked() {
    return this.doc.accessBlocked;
  }
  set accessBlocked(accessBlocked) {
    this.doc.accessBlocked = accessBlocked;
  }

  get tags() {
    return this.doc.tags;
  }
  set tags(tags) {
    this.doc.tags = tags;
  }

  get firstName() {
    return this.doc.firstName;
  }
  set firstName(firstName) {
    this.doc.firstName = firstName;
  }

  get lastName() {
    return this.doc.lastName;
  }
  set lastName(lastName) {
    this.doc.lastName = lastName;
  }

  get email() {
    return this.doc.email;
  }
  set email(email) {
    this.doc.email = email;
  }
}
