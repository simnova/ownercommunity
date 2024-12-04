import { VendorUser, VendorUserContactInformation, VendorUserIdentityDetails, VendorUserPersonalInformation } from '../../../models/users/vendor-user';
import { DomainExecutionContext } from '../../../../../../app/domain/domain-execution-context';
import { VendorUser as VendorUserDO, VendorUserProps } from '../../../../../../app/domain/contexts/users/vendor-user/vendor-user';
import { MongooseDomainAdapter } from '../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-domain-adapter';
import { MongoTypeConverter } from '../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-type-converter';
import { VendorUserIdentityDetailsProps } from '../../../../../../app/domain/contexts/users/vendor-user/vendor-user-identity-details';
import { VendorUserPersonalInformationProps } from '../../../../../../app/domain/contexts/users/vendor-user/vendor-user-personal-information';
import { VendorUserContactInformationEntityReference } from '../../../../../../app/domain/contexts/users/vendor-user/vendor-user-contact-information';
import { VendorUserVisa } from '../../../../../../app/domain/contexts/users/vendor-user/vendor-user.visa';
import { InfrastructureContext } from '../../../../../../app/init/infrastructure-context';

export class VendorUserConverter extends MongoTypeConverter<
  DomainExecutionContext, 
  VendorUser, 
  VendorUserDomainAdapter,
  VendorUserVisa, 
  VendorUserDO<VendorUserDomainAdapter>,
  InfrastructureContext
> {
  constructor() {
    super(VendorUserDomainAdapter, VendorUserDO);
  }
}

export class VendorUserDomainAdapter extends MongooseDomainAdapter<VendorUser, InfrastructureContext> implements VendorUserProps {
  get externalId() {
    return this.doc.externalId;
  }
  set externalId(externalId) {
    this.doc.externalId = externalId;
  }

  get personalInformation() {
    if (!this.doc.personalInformation) {
      this.doc.set('personalInformation', {});
    }
    return new VendorUserPersonalInformationDomainAdapter(this.doc.personalInformation, this.infrastructureContext);
  }

  get email() {
    return this.doc.email;
  }
  set email(email) {
    this.doc.email = email;
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
}

export class VendorUserPersonalInformationDomainAdapter implements VendorUserPersonalInformationProps {
    constructor(public readonly props: VendorUserPersonalInformation, private readonly infrastructureContext: InfrastructureContext) {}

    get identityDetails() {
      if (!this.props.identityDetails) {
        this.props.set('identityDetails', {});
      }
      return new VendorUserIdentityDetailsDomainAdapter(this.props.identityDetails, this.infrastructureContext);
    }

    get contactInformation() {
      if (!this.props.contactInformation) {
        this.props.set('contactInformation', {});
      }
      return new VendorUserContactInformationDomainAdapter(this.props.contactInformation, this.infrastructureContext);
    }
}

export class VendorUserIdentityDetailsDomainAdapter implements VendorUserIdentityDetailsProps {
    constructor(public readonly props: VendorUserIdentityDetails, private readonly infrastructureContext: InfrastructureContext) {}

    get lastName() {
      return this.props.lastName;
    }
    set lastName(lastName: string) {
      this.props.lastName = lastName;
    }

    get legalNameConsistsOfOneName() {
        return this.props.legalNameConsistsOfOneName;
    }
    set legalNameConsistsOfOneName(legalNameConsistsOfOneName: boolean) {
        this.props.legalNameConsistsOfOneName = legalNameConsistsOfOneName;
    }

    get restOfName() {
        return this.props.restOfName;
    }
    set restOfName(restOfName: string) {
        this.props.restOfName = restOfName;
    }
}

export class VendorUserContactInformationDomainAdapter implements VendorUserContactInformationEntityReference {
    constructor(public readonly props: VendorUserContactInformation, private readonly infrastructureContext: InfrastructureContext) {}

    get email() {
        return this.props.email;
    }
    set email(email: string) {
        this.props.email = email;
    }
}

