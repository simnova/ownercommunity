import { Entity, EntityProps } from '../../../../../../../seedwork/domain-seedwork/entity';
import { DomainExecutionContext } from '../../../../domain-execution-context';
import { ServiceTicketV1Visa } from './service-ticket.visa';

export interface PhotoPropValues extends EntityProps {
  documentId: string;
  description: string;
  getNewDocumentId(): string;
}

export interface PhotoProps extends PhotoPropValues {}

export interface PhotoEntityReference extends Readonly<PhotoPropValues> {}


export class Photo extends Entity<PhotoProps> implements PhotoEntityReference {
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