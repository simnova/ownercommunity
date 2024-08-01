import { EndUser, EndUserContactInformation, EndUserIdentityDetails, EndUserPersonalInformation } from '../../../models/users/end-user';
import { DomainExecutionContext } from '../../../../../../app/domain/domain-execution-context';
import { EndUser as EndUserDO, EndUserProps } from '../../../../../../app/domain/contexts/users/end-user/end-user';
import { MongooseDomainAdapter } from '../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-domain-adapter';
import { MongoTypeConverter } from '../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-type-converter';
import { EndUserIdentityDetailsEntityReference, EndUserIdentityDetailsProps } from '../../../../../../app/domain/contexts/users/end-user/end-user-identity-details';
import { EndUserPersonalInformationEntityReference, EndUserPersonalInformationProps } from '../../../../../../app/domain/contexts/users/end-user/end-user-personal-information';
import { EndUserContactInformationEntityReference } from '../../../../../../app/domain/contexts/users/end-user/end-user-contact-information';

export class EndUserConverter extends MongoTypeConverter<DomainExecutionContext, EndUser, EndUserDomainAdapter, EndUserDO<EndUserDomainAdapter>> {
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

  get personalInformation(): EndUserPersonalInformationEntityReference {
    return new EndUserPersonalInformationDomainAdapter(this.doc.personalInformation);
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
    constructor(public readonly doc: EndUserPersonalInformation) {}
    public get id(): string { return this.doc.id; }

    get identityDetails(): EndUserIdentityDetailsEntityReference {
        return new EndUserIdentityDetailsDomainAdapter(this.doc.identityDetails);
    }

    get contactInformation(): EndUserContactInformationEntityReference {
        return new EndUserContactInformationDomainAdapter(this.doc.contactInformation);
    }
}

export class EndUserIdentityDetailsDomainAdapter implements EndUserIdentityDetailsProps {
    constructor(public readonly doc: EndUserIdentityDetails) {}
    public get id(): string { return this.doc.id; }

    get lastName(): string {
      return this.doc.lastName;
    }
    set lastName(lastName: string) {
      this.doc.lastName = lastName;
    }

    get legalNameConsistsOfOneName(): boolean {
        return this.doc.legalNameConsistsOfOneName;
    }
    set legalNameConsistsOfOneName(legalNameConsistsOfOneName: boolean) {
        this.doc.legalNameConsistsOfOneName = legalNameConsistsOfOneName;
    }

    get restOfName(): string {
        return this.doc.restOfName;
    }
    set restOfName(restOfName: string) {
        this.doc.restOfName = restOfName;
    }
}

export class EndUserContactInformationDomainAdapter implements EndUserContactInformationEntityReference {
    constructor(public readonly doc: EndUserContactInformation) {}
    public get id(): string { return this.doc.id; }

    get email(): string {
        return this.doc.email;
    }
    set email(email: string) {
        this.doc.email = email;
    }
}

