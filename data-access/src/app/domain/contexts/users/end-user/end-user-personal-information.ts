import { Entity, EntityProps } from "../../../../../../seedwork/domain-seedwork/entity";
import { EndUserContactInformation, EndUserContactInformationProps } from "./end-user-contact-information";
import { EndUserIdentityDetails, EndUserIdentityDetailsProps } from "./end-user-identity-details";

export interface EndUserPersonalInformationProps extends EntityProps {
  identityDetails: EndUserIdentityDetailsProps;
  contactInformation: EndUserContactInformationProps;
}

export interface EndUserPersonalInformationEntityReference extends Readonly<EndUserPersonalInformationProps> {}

export class EndUserPersonalInformation extends Entity<EndUserPersonalInformationProps> implements EndUserPersonalInformationEntityReference{
  constructor(props: EndUserPersonalInformationProps) {
    super(props);
  }

  get identityDetails(): EndUserIdentityDetailsProps {
    return new EndUserIdentityDetails(this.props.identityDetails);
  }

  get contactInformation(): EndUserContactInformationProps {
    return new EndUserContactInformation(this.props.contactInformation);
  }
}