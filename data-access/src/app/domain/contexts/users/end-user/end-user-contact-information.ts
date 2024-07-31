import { Entity, EntityProps } from "../../../../../../seedwork/domain-seedwork/entity";
import { Email } from "./end-user.value-objects";

export interface EndUserContactInformationProps extends EntityProps {
  email: string;
}

export interface EndUserContactInformationEntityReference extends Readonly<EndUserContactInformationProps> {}

export class EndUserContactInformation extends Entity<EndUserContactInformationProps> implements EndUserContactInformationEntityReference {
  constructor(props: EndUserContactInformationProps) {
    super(props);
  }

  get email(): string {
    return this.props.email;
  }

  set Email(email: string) {
    this.props.email = (new Email(email)).valueOf();
  }
}