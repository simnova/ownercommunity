import { ValueObject, ValueObjectProps } from "../../../../../../../seedwork/domain-seedwork/value-object";
import { DomainExecutionContext } from "../../../../../../../framework/domain/domain-execution-context";


export interface ApprovalProps extends ValueObjectProps {
  isApplicantApprovalRequired: boolean;
  isApplicantApproved: boolean;
  applicantRespondedAt: Date;
}

export interface ApprovalEntityReference extends Readonly<Omit<ApprovalProps, ''>> {}

export class Approval extends ValueObject<ApprovalProps> implements ApprovalEntityReference {
  constructor(props: ApprovalProps, private readonly context: DomainExecutionContext) {
    super(props);
  }

  get isApplicantApprovalRequired(): boolean {
    return this.props.isApplicantApprovalRequired;
  }

  set IsApplicantApprovalRequired(isApplicantApprovalRequired: boolean) {
    this.props.isApplicantApprovalRequired = isApplicantApprovalRequired;
  }

  get isApplicantApproved(): boolean {
    return this.props.isApplicantApproved;
  }

  set IsApplicantApproved(isApplicantApproved: boolean) {
    this.props.isApplicantApproved = isApplicantApproved;
  }

  get applicantRespondedAt(): Date {
    return this.props.applicantRespondedAt;
  }

  set ApplicantRespondedAt(applicantRespondedAt: Date) {
    this.props.applicantRespondedAt = applicantRespondedAt;
  }
}