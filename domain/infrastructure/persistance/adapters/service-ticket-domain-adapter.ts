import { ActivityDetail, ServiceTicket, Photo } from '../../../../infrastructure/data-sources/cosmos-db/models/service-ticket';
import { ServiceTicket as ServiceTicketDO, ServiceTicketProps } from '../../../../domain/contexts/service-ticket/service-ticket';
import { MongooseDomainAdapter, MongoosePropArray } from '../mongo-domain-adapter';
import { MongoTypeConverter } from '../mongo-type-converter';
import { DomainExecutionContext } from '../../../contexts/context';
import { CommunityEntityReference, CommunityProps } from '../../../contexts/community/community';
import { CommunityDomainAdapter } from './community-domain-adapter';
import { PropertyDomainAdapter } from './property-domain-adapter';
import { PropertyEntityReference, PropertyProps } from '../../../contexts/property/property';
import { MemberEntityReference, MemberProps } from '../../../contexts/community/member';
import { MemberDomainAdapter } from './member-domain-adapter';
import { ActivityDetailProps } from '../../../contexts/service-ticket/activity-detail';
import { PhotoProps } from '../../../contexts/service-ticket/photo';
import { UserDomainAdapter } from './user-domain-adapter';
import { UserProps } from '../../../contexts/user/user';
import { nanoid } from 'nanoid';


export class ServiceTicketConverter extends MongoTypeConverter<DomainExecutionContext,ServiceTicket,ServiceTicketDomainAdapter,ServiceTicketDO<ServiceTicketDomainAdapter>> {
  constructor() {
    super(ServiceTicketDomainAdapter, ServiceTicketDO);
  }
}

export class ServiceTicketDomainAdapter extends MongooseDomainAdapter<ServiceTicket> implements ServiceTicketProps {
  constructor(props: ServiceTicket) { super(props); }

  get community() {
    if(this.props.community) {return new CommunityDomainAdapter(this.props.community);}
  }
  public setCommunityRef(community:CommunityEntityReference) {
    this.props.set('community',community.id);
  }

  get property() {
    if(this.props.property) {return new PropertyDomainAdapter(this.props.property);}
  }
  public setPropertyRef(property:PropertyEntityReference) {
    this.props.set('property',property.id);
  }

  get requestor() {
    if(this.props.requestor) {return new MemberDomainAdapter(this.props.requestor);}
  }
  public setRequestorRef(requestor:MemberEntityReference) {
    this.props.set('requestor',requestor['props']['props']);
  }

  get assignedTo() {
    if(this.props.assignedTo) {return this.props.assignedTo?new MemberDomainAdapter(this.props.assignedTo):undefined;}
  }
  public setAssignedToRef(assignedTo:MemberEntityReference) {
    this.props.set('assignedTo',assignedTo?assignedTo['props']['props']:null);
  }

  get title() {return this.props.title;}
  set title(title) {this.props.title = title;}

  get description() {return this.props.description;}
  set description(description) {this.props.description = description;}

  get status() {return this.props.status;}
  set status(status) {this.props.status = status;}

  get priority() {return this.props.priority;}
  set priority(priority) {this.props.priority = priority;}

  get activityLog() {return new MongoosePropArray(this.props.activityLog, ActivityDetailDomainAdapter) }

  get photos() {return new MongoosePropArray(this.props.photos, PhotoDomainAdapter) }
}


export class ActivityDetailDomainAdapter implements ActivityDetailProps {
  constructor(public readonly props: ActivityDetail) {}
  public get id(): string { return this.props.id.valueOf() as string; }

  get activityType() {return this.props.activityType;}
  set activityType(activityType) {this.props.activityType = activityType;}

  get activityDescription() {return this.props.activityDescription;}
  set activityDescription(description) {this.props.activityDescription = description;}

  get activityBy(){
    if(this.props.activityBy) { return new MemberDomainAdapter(this.props.activityBy);}
  }
  public setActivityByRef (activityBy: MemberEntityReference) {
    this.props.set('activityBy', activityBy['props']['props']);
  }
}

export class PhotoDomainAdapter implements PhotoProps {
  constructor(public readonly props: Photo) {}
  public get id(): string { return this.props.id.valueOf() as string; }

  get documentId() {return this.props.documentId;}
  set documentId(documentId) {this.props.documentId = documentId;}

  get description() {return this.props.description;}
  set description(description) {this.props.description = description;}

  getNewDocumentId(): string {
    return nanoid();
  }
}