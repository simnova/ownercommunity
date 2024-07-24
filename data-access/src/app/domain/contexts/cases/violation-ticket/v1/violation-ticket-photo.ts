import { EntityProps, Entity } from "../../../../../../../seedwork/domain-seedwork/entity";
import { DomainExecutionContext } from "../../../domain-execution-context";
import { ServiceTicketVisa } from "../../../iam/domain-visa/service-ticket-visa";

export interface ViolationTicketV1PhotoPropValues extends EntityProps {
  documentId: string;
  description: string;
  getNewDocumentId(): string;
}

export interface ViolationTicketV1PhotoProps extends ViolationTicketV1PhotoPropValues {}

export interface ViolationTicketV1PhotoEntityReference extends Readonly<ViolationTicketV1PhotoPropValues> {}


export class ViolationTicketV1Photo extends Entity<ViolationTicketV1PhotoProps> implements ViolationTicketV1PhotoEntityReference {
  constructor(props: ViolationTicketV1PhotoProps,
    private context: DomainExecutionContext,
    private readonly visa: ServiceTicketVisa) { super(props); }

  get documentId() {return this.props.documentId;}
  get description() {return this.props.description;}
  getNewDocumentId(): string {return this.props.getNewDocumentId();}

  // using set from TS 5.1

  set DocumentId(documentId: string) {
    this.props.documentId = documentId;
  }

  set Description(description: string) {
    this.props.description = description;
  }
 
}