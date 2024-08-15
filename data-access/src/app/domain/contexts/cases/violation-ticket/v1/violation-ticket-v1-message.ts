import { DomainEntity, DomainEntityProps } from '../../../../../../../seedwork/domain-seedwork/domain-entity';
import { DomainExecutionContext } from '../../../../domain-execution-context';
import { ViolationTicketV1Visa } from './violation-ticket.visa';
import { Member, MemberEntityReference, MemberProps } from '../../../community/member/member';
import * as ValueObjects from './violation-ticket-v1-message.value-objects';

export interface ViolationTicketV1MessagePropValues extends DomainEntityProps {
  sentBy: string;
  readonly initiatedBy?: MemberProps;
  setInitiatedByRef: (initiatedBy: MemberEntityReference) => void;
  message: string;
  embedding?: string;
  createdAt: Date;
  isHiddenFromApplicant: boolean;
}

export interface ViolationTicketV1MessageProps extends ViolationTicketV1MessagePropValues {}

export interface ViolationTicketV1MessageEntityReference extends Readonly<Omit<ViolationTicketV1MessagePropValues, 'initiatedBy' | 'setInitiatedByRef'>> {
  readonly initiatedBy: MemberEntityReference;
}

export class ViolationTicketV1Message extends DomainEntity<ViolationTicketV1MessageProps> implements ViolationTicketV1MessageEntityReference {
  constructor(props: ViolationTicketV1MessageProps, private context: DomainExecutionContext, private readonly visa: ViolationTicketV1Visa) {
    super(props);
  }

  get sentBy() {
    return this.props.sentBy;
  }
  get initiatedBy() {
    return new Member(this.props.initiatedBy, this.context);
  }
  get message() {
    return this.props.message;
  }
  get embedding() {
    return this.props.embedding;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get isHiddenFromApplicant() {
    return this.props.isHiddenFromApplicant;
  }

  // using set from TS 5.1

  set SentBy(sentBy: ValueObjects.SentBy) {
    this.props.sentBy = sentBy.valueOf();
  }

  set InitiatedBy(initiatedBy: MemberEntityReference) {
    this.props.setInitiatedByRef(initiatedBy);
  }

  set Message(message: ValueObjects.Message) {
    this.props.message = message.valueOf();
  }

  set Embedding(embedding: ValueObjects.Embedding) {
    this.props.embedding = embedding.valueOf();
  }

  set CreatedAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  set IsHiddenFromApplicant(isHiddenFromApplicant: boolean) {
    this.props.isHiddenFromApplicant = isHiddenFromApplicant;
  }
}
