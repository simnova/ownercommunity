import { ValueObject, ValueObjectProps } from "../../../../../../framework/seedwork/domain-seedwork/value-object";
import { Email } from "./end-user.value-objects";

export interface EndUserContactInformationProps extends ValueObjectProps {
  email: string;
}

export interface EndUserContactInformationEntityReference extends Readonly<EndUserContactInformationProps> {}

export class EndUserContactInformation extends ValueObject<EndUserContactInformationProps> implements EndUserContactInformationEntityReference {
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