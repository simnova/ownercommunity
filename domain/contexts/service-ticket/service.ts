import { EntityProps } from '../../shared/entity';
import { Community, CommunityProps, CommunityEntityReference } from '../community/community';
import { AggregateRoot } from '../../shared/aggregate-root';
import { DomainExecutionContext } from '../context';
import * as ValueObjects from './service.value-objects';
import { ServiceVisa } from '../iam/service-visa';

export interface ServiceProps extends EntityProps {
  readonly community: CommunityProps;
  setCommunityRef(community: CommunityEntityReference) : void;
  serviceName: string;
  description: string;
  isActive: boolean;

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly schemaVersion: string;
}

export interface ServiceEntityReference extends Readonly<Omit<ServiceProps,
  'community' | 'setCommunityRef' 
  >>{
  readonly community: CommunityEntityReference;
}

export class Service<props extends ServiceProps> extends AggregateRoot<props> implements ServiceEntityReference{
  private isNew: boolean = false;
  private readonly visa: ServiceVisa;
  constructor(props: props, private context:DomainExecutionContext) { 
    super(props); 
    this.visa = context.passport.forService(this);
  }

  public static getNewInstance<props extends ServiceProps> (
      newProps:props,
      serviceName:string,
      description:string,
      community:CommunityEntityReference, 
      context:DomainExecutionContext): Service<props> {
    let service = new Service(newProps,context);
    service.isNew = true;
    service.requestSetServiceName(serviceName);
    service.requestSetDescription(description);
    service.requestSetCommunity(community);
    service.requestSetIsActive(true);
    service.isNew = false;
    return service;
  }

  get community() { return new Community(this.props.community, this.context); }
  get serviceName() { return this.props.serviceName; }
  get description() { return this.props.description; }
  get isActive() { return this.props.isActive; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }  
  get schemaVersion(): string {return this.props.schemaVersion; }  

  private requestSetCommunity(community:CommunityEntityReference):void{
    if(!this.isNew) { throw new Error('Unauthorized'); }
    this.props.setCommunityRef(community);
  }
  public requestSetServiceName(serviceName:string):void{
    // if(
    //   !this.isNew &&
    //   !this.visa.determineIf(permissions => permissions.isSystemAccount || permissions.canManageServices)) { throw new Error('Unauthorized3'); }
    this.props.serviceName = (new ValueObjects.ServiceName(serviceName)).valueOf();
  }
  public requestSetDescription(description:string):void{
    // if(
    //   !this.isNew &&
    //   !this.visa.determineIf(permissions => permissions.isSystemAccount || permissions.canManageServices)) { throw new Error('Unauthorized4'); }
    this.props.description = (new ValueObjects.Description(description)).valueOf();
  }
  public requestSetIsActive(isActive:boolean):void{
    // if(
    //   !this.isNew &&
    //   !this.visa.determineIf(permissions => permissions.isSystemAccount)) { throw new Error('Unauthorized5'); }
    this.props.isActive = isActive;
  }
}