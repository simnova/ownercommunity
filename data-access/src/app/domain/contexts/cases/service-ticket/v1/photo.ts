import { DomainEntity, DomainEntityProps } from '../../../../../../../seedwork/domain-seedwork/domain-entity';
import { DomainExecutionContext } from '../../../../../../../framework/domain/domain-execution-context';
import { ServiceTicketV1Visa } from './service-ticket.visa';

export interface PhotoPropValues extends DomainEntityProps {
  documentId: string;
  description: string;
  getNewDocumentId(): string;
}

export interface PhotoProps extends PhotoPropValues {}

export interface PhotoEntityReference extends Readonly<PhotoPropValues> {}


export class Photo extends DomainEntity<PhotoProps> implements PhotoEntityReference {
  constructor(props: PhotoProps,
    private context: DomainExecutionContext,
    private readonly visa: ServiceTicketV1Visa) { super(props); }

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