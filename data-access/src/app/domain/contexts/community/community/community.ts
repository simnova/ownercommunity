import { CommunityCreatedEvent } from '../../../events/types/community-created';
import { CommunityDomainUpdatedEvent } from '../../../events/types/community-domain-updated';
import { AggregateRoot } from '../../../../../../seedwork/domain-seedwork/aggregate-root';
import { DomainEntityProps } from '../../../../../../seedwork/domain-seedwork/domain-entity';
import { DomainExecutionContext, SystemDomainExecutionContext } from '../../../domain-execution-context';
import { CommunityVisa } from "../community.visa";
import { EndUser, EndUserEntityReference, EndUserProps } from '../../users/end-user/end-user';
import * as ValueObjects from './community.value-objects';
import { ApprovedVendor } from '../../../../../infrastructure-services-impl/datastore/mongodb/models/community';

export interface CommunityProps extends DomainEntityProps {
  name: string;
  domain: string;
  whiteLabelDomain: string;
  handle: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly schemaVersion: string;
  readonly createdBy: EndUserProps;
  setCreatedByRef(user: EndUserEntityReference): void;
  approvedVendors?: ApprovedVendor[];
}

export interface CommunityEntityReference extends Readonly<Omit<CommunityProps, 'createdBy' | 'setCreatedByRef'>> {
  readonly createdBy: EndUserEntityReference;
}

export class Community<props extends CommunityProps> extends AggregateRoot<props, DomainExecutionContext, CommunityVisa> implements CommunityEntityReference {
  private isNew: boolean = false;
  constructor(props: props, _context: DomainExecutionContext) {
    super(props, _context, SystemDomainExecutionContext(), (context) => context.domainVisa.forCommunity(this), {});
  }

  get id() {
    return this.props.id;
  }
  get name() {
    return this.props.name;
  }
  get domain() {
    return this.props.domain;
  }
  get whiteLabelDomain() {
    return this.props.whiteLabelDomain;
  }
  get handle() {
    return this.props.handle;
  }
  get createdBy(): EndUserEntityReference {
    return new EndUser(this.props.createdBy, this.context);
  }
  get updatedAt() {
    return this.props.updatedAt;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get schemaVersion() {
    return this.props.schemaVersion;
  }

  public static getNewInstance<props extends CommunityProps>(
    newProps: props,
    communityName: string,
    createdByUser: EndUserEntityReference,
    context: DomainExecutionContext
  ): Community<props> {
    let community = new Community(newProps, context);
    community.MarkAsNew();
    community.Name = communityName;
    community.CreatedBy = createdByUser;
    community.isNew = false;
    return community;
  }

  private MarkAsNew(): void {
    this.isNew = true;
    this.addIntegrationEvent(CommunityCreatedEvent, { communityId: this.props.id });
  }

  // use setters from TS 5.1

  set Name(name: string) {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.canManageCommunitySettings)) {
      throw new Error('You do not have permission to change the name of this community');
    }
    this.props.name = new ValueObjects.Name(name).valueOf();
  }

  set Domain(domain: string) {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.canManageCommunitySettings)) {
      throw new Error('You do not have permission to change the domain of this community');
    }
    const oldDomain = this.props.domain;
    if (this.props.domain !== domain) {
      this.props.domain = new ValueObjects.Domain(domain).valueOf();
      this.addIntegrationEvent(CommunityDomainUpdatedEvent, { communityId: this.props.id, domain, oldDomain: oldDomain });
    }
  }

  set WhiteLabelDomain(whiteLabelDomain: string) {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.canManageCommunitySettings)) {
      throw new Error('You do not have permission to change the white label domain of this community');
    }
    this.props.whiteLabelDomain = whiteLabelDomain ? new ValueObjects.WhiteLabelDomain(whiteLabelDomain).valueOf() : null;
  }

  set Handle(handle: string) {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.canManageCommunitySettings)) {
      throw new Error('You do not have permission to change the handle of this community');
    }
    this.props.handle = handle ? new ValueObjects.Handle(handle).valueOf() : null;
  }

  set ApprovedVendors(approvedVendors: ApprovedVendor[]) {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.canManageCommunitySettings)) {
      throw new Error('You do not have permission to change the handle of this community');
    }
    this.props.approvedVendors = approvedVendors ? new ValueObjects.ApprovedVendors(approvedVendors).valueOf() : null;
  }

  set CreatedBy(createdBy: EndUserEntityReference) {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.canManageCommunitySettings)) {
      throw new Error('You do not have permission to change the created by of this community');
    }
    if (createdBy === null || createdBy === undefined) {
      throw new Error('createdBy cannot be null or undefined');
    }
    this.props.setCreatedByRef(createdBy);
  }
}
