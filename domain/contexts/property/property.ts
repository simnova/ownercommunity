import { Entity, EntityProps } from '../../shared/entity';
import { Community, CommunityEntityReference, CommunityProps } from '../community/community';
import { Member, MemberEntityReference, MemberProps } from '../community/member';
import { DomainExecutionContext } from '../context';
import * as ValueObjects from './property-value-objects';
import { ListingDetails, ListingDetailProps, ListingDetailsEntityReference } from './listing-detail';
import { Location, LocationEntityReference, LocationProps } from './location';
import { AggregateRoot } from '../../shared/aggregate-root';
import { PropertyVisa } from '../iam/property-visa';
import { PropertyCreatedEvent } from '../../events/property-created';
import { PropertyDeletedEvent } from '../../events/property-deleted';
import { PropertyUpdatedEvent } from '../../events/property-updated';

export interface PropertyProps extends EntityProps {
  readonly community: CommunityProps;
  setCommunityRef(community: CommunityEntityReference): void;
  readonly location: LocationProps;
  readonly owner: MemberProps | undefined;
  setOwnerRef(owner: MemberEntityReference): void;
  propertyName: string;
  propertyType: string;
  listedForSale: boolean;
  listedForRent: boolean;
  listedForLease: boolean;
  listedInDirectory: boolean;
  readonly listingDetail: ListingDetailProps;

  createdAt: Date;
  updatedAt: Date;

  tags: string[];
  schemaVersion: string;

  hash: string;
  lastIndexed: Date;
}

export interface PropertyEntityReference extends Readonly<Omit<PropertyProps, 'community' | 'setCommunityRef' | 'location' | 'owner' | 'setOwnerRef' | 'listingDetail'>> {
  readonly community: CommunityEntityReference;
  readonly location: LocationEntityReference;
  readonly owner: MemberEntityReference;
  readonly listingDetail: ListingDetailsEntityReference;
}

export class Property<props extends PropertyProps> extends AggregateRoot<props> implements PropertyEntityReference {
  private readonly visa: PropertyVisa;
  private isNew: boolean = false;
  constructor(props: props, private readonly context: DomainExecutionContext) {
    super(props);
    this.visa = context.passport.forProperty(this);
  }

  public static getNewInstance<props extends PropertyProps>(newProps: props, propertyName: string, community: CommunityEntityReference, context: DomainExecutionContext): Property<props> {
    var property = new Property(newProps, context);
    property.MarkAsNew();
    property.requestSetPropertyName(propertyName);
    property.requestSetCommunity(community);
    property.isNew = false;
    return property;
  }

  get community(): CommunityEntityReference {
    return new Community(this.props.community, this.context);
  }
  // get location():LocationEntityReference|undefined { return this.props.location? new Location(this.props.location, this.context):undefined; }
  get location() {
    return new Location(this.props.location, this.visa);
  }
  get owner(): MemberEntityReference | undefined {
    return this.props.owner ? new Member(this.props.owner, this.context) : undefined;
  }
  get propertyName() {
    return this.props.propertyName;
  }
  get propertyType() {
    return this.props.propertyType;
  }
  get listedForSale() {
    return this.props.listedForSale;
  }
  get listedForRent() {
    return this.props.listedForRent;
  }
  get listedForLease() {
    return this.props.listedForLease;
  }
  get listedInDirectory() {
    return this.props.listedInDirectory;
  }
  get listingDetail() {
    return new ListingDetails(this.props.listingDetail, this.visa);
  } //editable
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  get tags() {
    return this.props.tags;
  }

  get schemaVersion() {
    return this.props.schemaVersion;
  }

  get hash() {
    return this.props.hash;
  }

  get lastIndexed() {
    return this.props.lastIndexed;
  }

  private MarkAsNew(): void {
    this.isNew = true;
    this.addIntegrationEvent(PropertyCreatedEvent, { id: this.props.id });
  }

  public requestSetCommunity(community: CommunityEntityReference): void {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.isSystemAccount || permissions.canManageProperties)) {
      throw new Error('Unauthorized');
    }
    this.props.setCommunityRef(community);
  }
  // public requestSetLocation(location: LocationEntityReference): void {
  //   if(!this.visa.determineIf(permissions => permissions.isSystemAccount || permissions.canManageProperties)) { throw new Error('Unauthorized'); }
  //   this.props.setLocationRef(location);
  // }
  public requestSetOwner(owner: MemberEntityReference): void {
    if (!this.visa.determineIf((permissions) => permissions.isSystemAccount || permissions.canManageProperties)) {
      throw new Error('Unauthorized');
    }
    this.props.setOwnerRef(owner);
  }
  public requestDelete(): void {
    if (!this.isDeleted && !this.visa.determineIf((permissions) => permissions.isSystemAccount || permissions.canManageProperties)) {
      throw new Error('You do not have permission to delete this property');
    }
    super.isDeleted = true;
    this.addIntegrationEvent(PropertyDeletedEvent, { id: this.props.id });
  }
  public requestSetPropertyName(propertyName: ValueObjects.PropertyName): void {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.isSystemAccount || permissions.canManageProperties)) {
      throw new Error('Unauthorized');
    }
    this.props.propertyName = propertyName.valueOf();
  }
  public requestSetPropertyType(propertyType: ValueObjects.PropertyType): void {
    if (!this.visa.determineIf((permissions) => permissions.isSystemAccount || permissions.canManageProperties)) {
      throw new Error('Unauthorized');
    }
    this.props.propertyType = propertyType?.valueOf();
  }
  public requestSetListedForSale(listedForSale: boolean): void {
    if (!this.visa.determineIf((permissions) => permissions.isSystemAccount || permissions.canManageProperties || (permissions.canEditOwnProperty && permissions.isEditingOwnProperty))) {
      throw new Error('Unauthorized');
    }
    this.props.listedForSale = listedForSale;
  }
  public requestSetListedForRent(listedForRent: boolean): void {
    if (!this.visa.determineIf((permissions) => permissions.isSystemAccount || permissions.canManageProperties || (permissions.canEditOwnProperty && permissions.isEditingOwnProperty))) {
      throw new Error('Unauthorized');
    }
    this.props.listedForRent = listedForRent;
  }
  public requestSetListedForLease(listedForLease: boolean): void {
    if (!this.visa.determineIf((permissions) => permissions.isSystemAccount || permissions.canManageProperties || (permissions.canEditOwnProperty && permissions.isEditingOwnProperty))) {
      throw new Error('Unauthorized');
    }
    this.props.listedForLease = listedForLease;
  }
  public requestSetListedInDirectory(listedInDirectory: boolean): void {
    if (!this.visa.determineIf((permissions) => permissions.isSystemAccount || permissions.canManageProperties || (permissions.canEditOwnProperty && permissions.isEditingOwnProperty))) {
      throw new Error('Unauthorized');
    }
    this.props.listedInDirectory = listedInDirectory;
  }

  public requestSetTags(tags: string[]): void {
    if (!this.visa.determineIf((permissions) => permissions.isSystemAccount || permissions.canManageProperties || (permissions.canEditOwnProperty && permissions.isEditingOwnProperty))) {
      throw new Error('Unauthorized');
    }
    this.props.tags = tags;
  }

  public requestSetHash(hash: string): void {
    if (!this.visa.determineIf((permissions) => permissions.isSystemAccount || permissions.canManageProperties || (permissions.canEditOwnProperty && permissions.isEditingOwnProperty))) {
      throw new Error('Unauthorized');
    }
    this.props.hash = hash;
  }

  public requestSetLastIndexed(lastIndexed: Date): void {
    if (!this.visa.determineIf((permissions) => permissions.isSystemAccount || permissions.canManageProperties || (permissions.canEditOwnProperty && permissions.isEditingOwnProperty))) {
      throw new Error('Unauthorized');
    }
    this.props.lastIndexed = lastIndexed;
  }

  public override onSave(isModified: boolean): void {
    if (isModified && !super.isDeleted) {
      this.addIntegrationEvent(PropertyUpdatedEvent, { id: this.props.id });
    }
  }
}

export interface PropertyPermissions {
  canManageProperties: boolean;
  canEditOwnProperty: boolean;
  isEditingOwnProperty: boolean;
  isSystemAccount: boolean;
}
