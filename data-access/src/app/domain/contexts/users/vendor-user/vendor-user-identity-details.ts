import { ValueObject, ValueObjectProps } from "../../../../../../seedwork/domain-seedwork/value-object";
import * as ValueObjects from './vendor-user.value-objects';

export interface VendorUserIdentityDetailsProps extends ValueObjectProps {
  lastName: string;
  legalNameConsistsOfOneName: boolean;
  restOfName?: string;
}

export interface VendorUserIdentityDetailsEntityReference extends Readonly<VendorUserIdentityDetailsProps> {}

export class VendorUserIdentityDetails extends ValueObject<VendorUserIdentityDetailsProps> implements VendorUserIdentityDetailsEntityReference {
  constructor(props: VendorUserIdentityDetailsProps) {
    super(props);
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get legalNameConsistsOfOneName(): boolean {
    return this.props.legalNameConsistsOfOneName;
  }

  get restOfName(): string | undefined {
    return this.props.restOfName;
  }

  set LastName(lastName: string) {
    this.props.lastName = (new ValueObjects.LastName(lastName).valueOf());
  }

  set LegalNameConsistsOfOneName(legalNameConsistsOfOneName: boolean) {
    this.props.legalNameConsistsOfOneName = legalNameConsistsOfOneName;
  }

  set RestOfName(restOfName: string | undefined) {
    this.props.restOfName = (new ValueObjects.FirstName(restOfName).valueOf());
  }
}