import { EntityProps, Entity } from "../../../../../../../seedwork/domain-seedwork/entity";
import { DomainExecutionContext } from "../../../domain-execution-context";
import { ServiceTicketVisa } from "../../../iam/domain-visa/service-ticket-visa";

export interface ServiceTicketV1PhotoPropValues extends EntityProps {
  documentId: string;
  description: string;
  getNewDocumentId(): string;
}

export interface ServiceTicketV1PhotoProps extends ServiceTicketV1PhotoPropValues {}

export interface ServiceTicketV1PhotoEntityReference extends Readonly<ServiceTicketV1PhotoPropValues> {}


export class ServiceTicketV1Photo extends Entity<ServiceTicketV1PhotoProps> implements ServiceTicketV1PhotoEntityReference {
  constructor(props: ServiceTicketV1PhotoProps,
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