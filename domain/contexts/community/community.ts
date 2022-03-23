import { AggregateRoot } from '../../shared/aggregate-root';
import { EntityProps } from '../../shared/entity';
import { DomainExecutionContext } from '../context';
import * as ValueObjects from './community-value-objects';

export interface CommunityProps extends EntityProps {
  name:string;
  domain: string;
  whiteLabelDomain: string;
  handle: string;
  createdAt: Date;
  updatedAt: Date;
  schemaVersion: string;
}

export interface CommunityEntityReference extends Readonly<CommunityProps> {}

export class Community<props extends CommunityProps> extends AggregateRoot<props> implements CommunityEntityReference  {
  constructor(props: props,private readonly context: DomainExecutionContext) { super(props); }

  get id(): string {return this.props.id;}
  get name(): string {return this.props.name;}
  get domain(): string {return this.props.domain;}
  get whiteLabelDomain(): string {return this.props.whiteLabelDomain;}
  get handle(): string {return this.props.handle;}
  get updatedAt(): Date {return this.props.updatedAt;}
  get createdAt(): Date {return this.props.createdAt;}
  get schemaVersion(): string {return this.props.schemaVersion;}

  public static async getNewCommunity<props extends CommunityProps> (newprops:props,name:string,domain:string,whiteLabelDomain:string, handle:string, context: DomainExecutionContext): Promise<Community<props>> {
    let community = new Community(newprops, context);
    await community.requestSetName(name);
    await community.requestSetDomain(domain);
    await community.requestSetWhiteLabelDomain(whiteLabelDomain);
    return community;
  }

  public async requestSetName(name:ValueObjects.Name): Promise<void> {
    this.props.name = name.valueOf();
  }

  public async requestSetDomain(domain:ValueObjects.Domain): Promise<void> {
    this.props.domain = domain.valueOf();
  }

  public async requestSetWhiteLabelDomain(whiteLabelDomain:ValueObjects.WhiteLabelDomain): Promise<void> {
    this.props.whiteLabelDomain = whiteLabelDomain.valueOf();
  }

  public async reuestSetHandle(handle:ValueObjects.Handle): Promise<void> {
    this.props.handle = handle.valueOf();
  }

}

export interface CommunityPermissions {
  canManageRolesAndPermissions: boolean;
  canManageCommunitySettings: boolean;
  canManageSiteContent: boolean;
} 