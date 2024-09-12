import { EndUser, EndUserContactInformation, EndUserIdentityDetails, EndUserPersonalInformation } from '../../../models/users/end-user';
import { DomainExecutionContext } from '../../../../../../app/domain/domain-execution-context';
import { EndUser as EndUserDO, EndUserProps } from '../../../../../../app/domain/contexts/users/end-user/end-user';
import { MongooseDomainAdapter } from '../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-domain-adapter';
import { MongoTypeConverter } from '../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-type-converter';
import { EndUserIdentityDetailsProps } from '../../../../../../app/domain/contexts/users/end-user/end-user-identity-details';
import { EndUserPersonalInformationProps } from '../../../../../../app/domain/contexts/users/end-user/end-user-personal-information';
import { EndUserContactInformationEntityReference } from '../../../../../../app/domain/contexts/users/end-user/end-user-contact-information';
import { EndUserVisa } from '../../../../../../app/domain/contexts/users/end-user/end-user.visa';

export class EndUserConverter extends MongoTypeConverter<
  DomainExecutionContext, 
  EndUser, 
  EndUserDomainAdapter,
  EndUserVisa, 
  EndUserDO<EndUserDomainAdapter>
> {
  constructor() {
    super(EndUserDomainAdapter, EndUserDO);
  }
}

export class EndUserDomainAdapter extends MongooseDomainAdapter<EndUser> implements EndUserProps {
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
    return new EndUserPersonalInformationDomainAdapter(this.doc.personalInformation);
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

export class EndUserPersonalInformationDomainAdapter implements EndUserPersonalInformationProps {
    constructor(public readonly props: EndUserPersonalInformation) {}

    get identityDetails() {
      if (!this.props.identityDetails) {
        this.props.set('identityDetails', {});
      }
      return new EndUserIdentityDetailsDomainAdapter(this.props.identityDetails);
    }

    get contactInformation() {
      if (!this.props.contactInformation) {
        this.props.set('contactInformation', {});
      }
      return new EndUserContactInformationDomainAdapter(this.props.contactInformation);
    }
}

export class EndUserIdentityDetailsDomainAdapter implements EndUserIdentityDetailsProps {
    constructor(public readonly props: EndUserIdentityDetails) {}

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

export class EndUserContactInformationDomainAdapter implements EndUserContactInformationEntityReference {
    constructor(public readonly props: EndUserContactInformation) {}

    get email() {
        return this.props.email;
    }
    set email(email: string) {
        this.props.email = email;
    }
}

