import { Entity, EntityProps } from '../../../../../../../seedwork/domain-seedwork/entity';
import { DomainExecutionContext } from '../../../../domain-execution-context';
import { ServiceTicketV1Visa } from './service-ticket.visa';
import { Member, MemberEntityReference, MemberProps } from '../../../community/member/member';
import * as ValueObjects from './service-ticket-message.value-objects';

export interface ServiceTicketMessagePropValues extends EntityProps {
  sentBy: string;
  readonly initiatedBy?: MemberProps;
  setInitiatedByRef: (initiatedBy: MemberEntityReference) => void;
  message: string;
  embedding?: string;
  createdAt: Date;
  isHiddenFromApplicant: boolean;
}

export interface ServiceTicketMessageProps extends ServiceTicketMessagePropValues {}

export interface ServiceTicketMessageEntityReference extends Readonly<Omit<ServiceTicketMessagePropValues, 'initiatedBy' | 'setInitiatedByRef'>> {
  readonly initiatedBy: MemberEntityReference;
}

export class ServiceTicketMessage extends Entity<ServiceTicketMessageProps> implements ServiceTicketMessageEntityReference {
  constructor(props: ServiceTicketMessageProps, private context: DomainExecutionContext, private readonly visa: ServiceTicketV1Visa) {
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
