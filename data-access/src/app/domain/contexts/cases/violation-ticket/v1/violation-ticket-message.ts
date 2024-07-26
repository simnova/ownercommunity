import { Entity, EntityProps } from '../../../../../../../seedwork/domain-seedwork/entity';
import { DomainExecutionContext } from '../../../domain-execution-context';
import { ViolationTicketV1Visa } from './violation-ticket.visa';
import { Member, MemberEntityReference, MemberProps } from '../../../community/member/member';
import * as ValueObjects from './violation-ticket-message.value-objects';

export interface ViolationTicketMessagePropValues extends EntityProps {
  sentBy: string;
  readonly initiatedBy?: MemberProps;
  setInitiatedByRef: (initiatedBy: MemberEntityReference) => void;
  message: string;
  embedding?: string;
  createdAt: Date;
  isHiddenFromApplicant: boolean;
}

export interface ViolationTicketMessageProps extends ViolationTicketMessagePropValues {}

export interface ViolationTicketMessageEntityReference extends Readonly<Omit<ViolationTicketMessagePropValues, 'initiatedBy' | 'setInitiatedByRef'>> {
  readonly initiatedBy: MemberEntityReference;
}

export class ViolationTicketMessage extends Entity<ViolationTicketMessageProps> implements ViolationTicketMessageEntityReference {
  constructor(props: ViolationTicketMessageProps, private context: DomainExecutionContext, private readonly visa: ViolationTicketV1Visa) {
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
