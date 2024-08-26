
export class StaffUserConverter extends MongoTypeConverter<DomainExecutionContext, StaffUser, StaffUserDomainAdapter, StaffUserDO<StaffUserDomainAdapter>> {
  constructor() {
    super(StaffUserDomainAdapter, StaffUserDO);
  }
}

export class StaffUserDomainAdapter extends MongooseDomainAdapter<StaffUser> implements StaffUserProps {
  // Primitive Fields Getters and Setters
  get firstName() {
    return this.doc.firstName;
  }
  set firstName(value: string) {
    this.doc.firstName = value;
  }
  get lastName() {
    return this.doc.lastName;
  }
  set lastName(value: string) {
    this.doc.lastName = value;
  }
  get emailAddress() {
    return this.doc.emailAddress;
  }
  set emailAddress(value: string) {
    this.doc.emailAddress = value;
  }
  get accessBlocked() {
    return this.doc.accessBlocked;
  }
  set accessBlocked(value: boolean) {
    this.doc.accessBlocked = value;
  }
  get tags() {
    return this.doc.tags;
  }
  set tags(value: string[]) {
    this.doc.tags = value;
  }
  get displayName() {
    return this.doc.displayName;
  }
  set displayName(value: string) {
    this.doc.displayName = value;
  }
  get userType() {
    return this.doc.userType;
  }
  set userType(value: string) {
    this.doc.userType = value;
  }
  get externalId() {
    return this.doc.externalId;
  }
  set externalId(value: string) {
    this.doc.externalId = value;
  }

  // Nested Path Fields Getters
  get search() {
    if (!this.doc.search) {
      this.doc.set('search', {});
    }
    return new StaffUserSearchDomainAdapter(this.doc.search);
  }

  // Populated Doc Fields Getters and Setters
  get role() {
    if (this.doc.role) {
      return new StaffRoleDomainAdapter(this.doc.role);
    }
    return undefined;
  }
  setRoleRef(role: StaffRoleEntityReference) {
    this.doc.set('role', role['props']['doc']);
  }

  // Document Array Fields Getters

}

// Nested Path Domain Adapters
export class StaffUserSearchDomainAdapter implements StaffUserSearchProps {
  constructor(public readonly doc: StaffUserSearch) {}
  //Primitive Field Getters and Setters
  get hash() {
    return this.doc.hash;
  }
  set hash(value: string) {
    this.doc.hash = value;
  }
  get indexedAt() {
    return this.doc.indexedAt;
  }
  set indexedAt(value: Date) {
    this.doc.indexedAt = value;
  }
  get indexingFailedAt() {
    return this.doc.indexingFailedAt;
  }
  set indexingFailedAt(value: Date) {
    this.doc.indexingFailedAt = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}

// Document Array Domain Adapters


