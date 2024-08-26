
export class EntityConverter extends MongoTypeConverter<DomainExecutionContext, Entity, EntityDomainAdapter, EntityDO<EntityDomainAdapter>> {
  constructor() {
    super(EntityDomainAdapter, EntityDO);
  }
}

export class EntityDomainAdapter extends MongooseDomainAdapter<Entity> implements EntityProps {
  // Primitive Fields Getters and Setters
  get entityName() {
    return this.doc.entityName;
  }
  set entityName(value: string) {
    this.doc.entityName = value;
  }
  get entityLanguage() {
    return this.doc.entityLanguage;
  }
  set entityLanguage(value: string) {
    this.doc.entityLanguage = value;
  }
  get isIssuingInstitution() {
    return this.doc.isIssuingInstitution;
  }
  set isIssuingInstitution(value: boolean) {
    this.doc.isIssuingInstitution = value;
  }
  get isClient() {
    return this.doc.isClient;
  }
  set isClient(value: boolean) {
    this.doc.isClient = value;
  }
  get disabledAt() {
    return this.doc.disabledAt;
  }
  set disabledAt(value: Date) {
    this.doc.disabledAt = value;
  }

  // Nested Path Fields Getters
  get issuingInstitution() {
    if (!this.doc.issuingInstitution) {
      this.doc.set('issuingInstitution', {});
    }
    return new EntityIssuingInstitutionDomainAdapter(this.doc.issuingInstitution);
  }
  get client() {
    if (!this.doc.client) {
      this.doc.set('client', {});
    }
    return new EntityClientDomainAdapter(this.doc.client);
  }
  get address() {
    if (!this.doc.address) {
      this.doc.set('address', {});
    }
    return new EntityAddressInfoDomainAdapter(this.doc.address);
  }

  // Populated Doc Fields Getters and Setters
  get createdBy() {
    if (this.doc.createdBy) {
      return new StaffUserDomainAdapter(this.doc.createdBy);
    }
    return undefined;
  }
  setCreatedByRef(createdBy: StaffUserEntityReference) {
          this.doc.set('createdBy', createdBy ? createdBy['props']['doc'] : null);
        }

  // Document Array Fields Getters

}

// Nested Path Domain Adapters
export class EntityAddressInfoDomainAdapter implements EntityAddressInfoProps {
  constructor(public readonly doc: EntityAddressInfo) {}
  //Primitive Field Getters and Setters
  get addressLine1() {
    return this.doc.addressLine1;
  }
  set addressLine1(value: string) {
    this.doc.addressLine1 = value;
  }
  get addressLine2() {
    return this.doc.addressLine2;
  }
  set addressLine2(value: string) {
    this.doc.addressLine2 = value;
  }
  get city() {
    return this.doc.city;
  }
  set city(value: string) {
    this.doc.city = value;
  }
  get stateOrProvince() {
    return this.doc.stateOrProvince;
  }
  set stateOrProvince(value: string) {
    this.doc.stateOrProvince = value;
  }
  get zipOrPostalCode() {
    return this.doc.zipOrPostalCode;
  }
  set zipOrPostalCode(value: string) {
    this.doc.zipOrPostalCode = value;
  }
  get country() {
    return this.doc.country;
  }
  set country(value: string) {
    this.doc.country = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class EntityIssuingInstitutionDomainAdapter implements EntityIssuingInstitutionProps {
  constructor(public readonly doc: EntityIssuingInstitution) {}
  //Primitive Field Getters and Setters
  get email() {
    return this.doc.email;
  }
  set email(value: string) {
    this.doc.email = value;
  }
  get phoneNumber() {
    return this.doc.phoneNumber;
  }
  set phoneNumber(value: string) {
    this.doc.phoneNumber = value;
  }

  // Nested Path Getters
  get address() {
    if (!this.doc.address) {
      this.doc.set('address', {});
    }
    return new EntityAddressInfoDomainAdapter(this.doc.address);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class EntityClientDomainAdapter implements EntityClientProps {
  constructor(public readonly doc: EntityClient) {}
  //Primitive Field Getters and Setters
  get email() {
    return this.doc.email;
  }
  set email(value: string) {
    this.doc.email = value;
  }
  get phoneNumber() {
    return this.doc.phoneNumber;
  }
  set phoneNumber(value: string) {
    this.doc.phoneNumber = value;
  }

  // Nested Path Getters
  get address() {
    if (!this.doc.address) {
      this.doc.set('address', {});
    }
    return new EntityAddressInfoDomainAdapter(this.doc.address);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}

// Document Array Domain Adapters


