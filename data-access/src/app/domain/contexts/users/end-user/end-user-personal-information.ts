import { ValueObject, ValueObjectProps } from "../../../../../../seedwork/domain-seedwork/value-object";
import { EndUserContactInformation, EndUserContactInformationEntityReference, EndUserContactInformationProps } from "./end-user-contact-information";
import { EndUserIdentityDetails, EndUserIdentityDetailsEntityReference, EndUserIdentityDetailsProps } from "./end-user-identity-details";

export interface EndUserPersonalInformationProps extends ValueObjectProps {
  readonly identityDetails: EndUserIdentityDetailsProps;
  readonly contactInformation: EndUserContactInformationProps;
}

export interface EndUserPersonalInformationEntityReference extends Readonly<Omit<EndUserPersonalInformationProps, 'identityDetails' | 'contactInformation' >> {
  readonly identityDetails: EndUserIdentityDetailsEntityReference;
  readonly contactInformation: EndUserContactInformationEntityReference;
}

export class EndUserPersonalInformation extends ValueObject<EndUserPersonalInformationProps> implements EndUserPersonalInformationEntityReference{
  constructor(props: EndUserPersonalInformationProps) {
    super(props);
  }

  get identityDetails() {
    return new EndUserIdentityDetails(this.props.identityDetails);
  }

  get contactInformation() {
    return new EndUserContactInformation(this.props.contactInformation);
  }
}