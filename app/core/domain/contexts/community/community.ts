import { CommunityCreatedEvent } from '../../events/types/community-created';
import { CommunityDomainUpdatedEvent } from '../../events/types/community-domain-updated';
import { AggregateRoot } from '../../../../../seedwork/domain-seedwork/aggregate-root';
import { EntityProps } from '../../../../../seedwork/domain-seedwork/entity';
import { DomainExecutionContext } from '../domain-execution-context';
import { CommunityVisa } from '../iam/community-visa';
import { User, UserEntityReference, UserProps } from '../user/user';
import * as ValueObjects from './community.value-objects';

export interface CommunityProps extends EntityProps {
  name: string;
  domain: string;
  whiteLabelDomain: string;
  handle: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly schemaVersion: string;
  readonly createdBy: UserProps;
  setCreatedByRef(user: UserEntityReference): void;
}

export interface CommunityEntityReference extends Readonly<Omit<CommunityProps, 'createdBy' | 'setCreatedByRef'>> {
  readonly createdBy: UserEntityReference;
}

export class Community<props extends CommunityProps> extends AggregateRoot<props> implements CommunityEntityReference {
  private readonly visa: CommunityVisa;
  private isNew: boolean = false;
  constructor(props: props, private readonly context: DomainExecutionContext) {
    super(props);
    this.visa = context.passport.forCommunity(this);
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
  get createdBy(): UserEntityReference {
    return new User(this.props.createdBy, this.context);
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
    createdByUser: UserEntityReference,
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

  set Domain(domain: ValueObjects.Domain) {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.canManageCommunitySettings)) {
      throw new Error('You do not have permission to change the domain of this community');
    }
    const oldDomain = this.props.domain;
    if (oldDomain !== domain.valueOf()) {
      this.props.domain = domain.valueOf();
      this.addIntegrationEvent(CommunityDomainUpdatedEvent, { communityId: this.props.id, domain: domain.valueOf(), oldDomain: oldDomain });
    }
  }

  set WhiteLabelDomain(whiteLabelDomain: ValueObjects.WhiteLabelDomain) {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.canManageCommunitySettings)) {
      throw new Error('You do not have permission to change the white label domain of this community');
    }
    this.props.whiteLabelDomain = whiteLabelDomain ? whiteLabelDomain.valueOf() : null;
  }

  set Handle(handle: ValueObjects.Handle) {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.canManageCommunitySettings)) {
      throw new Error('You do not have permission to change the handle of this community');
    }
    this.props.handle = handle ? handle.valueOf() : null;
  }

  set CreatedBy(createdBy: UserEntityReference) {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.canManageCommunitySettings)) {
      throw new Error('You do not have permission to change the created by of this community');
    }
    if (createdBy === null || createdBy === undefined) {
      throw new Error('createdBy cannot be null or undefined');
    }
    this.props.setCreatedByRef(createdBy);
  }
}
