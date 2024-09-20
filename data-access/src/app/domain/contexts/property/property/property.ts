import { DomainEntityProps } from '../../../../../../seedwork/domain-seedwork/domain-entity';
import { Community, CommunityEntityReference, CommunityProps } from '../../community/community/community';
import { Member, MemberEntityReference, MemberProps } from '../../community/member/member';
import { DomainExecutionContext, SystemDomainExecutionContext } from '../../../domain-execution-context';
import * as ValueObjects from './property.value-objects';
import { PropertyListingDetail, PropertyListingDetailProps, PropertyListingDetailEntityReference } from './property-listing-detail';
import { PropertyLocation, PropertyLocationEntityReference, PropertyLocationProps } from './property-location';
import { AggregateRoot } from '../../../../../../seedwork/domain-seedwork/aggregate-root';
import { PropertyVisa } from './property.visa';
import { PropertyCreatedEvent } from '../../../events/types/property-created';
import { PropertyDeletedEvent } from '../../../events/types/property-deleted';
import { PropertyUpdatedEvent } from '../../../events/types/property-updated';

export interface PropertyProps extends DomainEntityProps {
  readonly community: CommunityProps;
  setCommunityRef(community: CommunityEntityReference): void;
  readonly location: PropertyLocationProps;
  readonly owner: MemberProps | undefined;
  setOwnerRef(owner: MemberEntityReference): void;
  propertyName: string;
  propertyType: string;
  listedForSale: boolean;
  listedForRent: boolean;
  listedForLease: boolean;
  listedInDirectory: boolean;
  readonly listingDetail: PropertyListingDetailProps;

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly schemaVersion: string;

  tags: string[];

  hash: string;
  lastIndexed: Date; // success
  updateIndexFailedDate: Date; // failure
}

export interface PropertyEntityReference extends Readonly<Omit<PropertyProps, 'community' | 'setCommunityRef' | 'location' | 'owner' | 'setOwnerRef' | 'listingDetail'>> {
  readonly community: CommunityEntityReference;
  readonly location: PropertyLocationEntityReference;
  readonly owner: MemberEntityReference;
  readonly listingDetail: PropertyListingDetailEntityReference;
}

export class Property<props extends PropertyProps> extends AggregateRoot<props, DomainExecutionContext, PropertyVisa> implements PropertyEntityReference {
  private isNew: boolean = false;
  constructor(props: props, _context: DomainExecutionContext) {
    super(props, _context, SystemDomainExecutionContext(), (context) => context.domainVisa.forProperty(this), {});
  }

  public static getNewInstance<props extends PropertyProps>(
    newProps: props,
    propertyName: string,
    community: CommunityEntityReference,
    context: DomainExecutionContext
  ): Property<props> {
    const property = new Property(newProps, context);
    property.MarkAsNew();
    property.PropertyName = propertyName;
    property.Community = community;
    property.isNew = false;
    return property;
  }

  get community(): CommunityEntityReference {
    return new Community(this.props.community, this.context);
  }
  get location() {
    return new PropertyLocation(this.props.location, this.visa);
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
    return new PropertyListingDetail(this.props.listingDetail, this.visa);
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

  get updateIndexFailedDate() {
    return this.props.updateIndexFailedDate;
  }

  private MarkAsNew(): void {
    this.isNew = true;
    this.addIntegrationEvent(PropertyCreatedEvent, { id: this.props.id });
  }

  // using setters from typeScript 5.1

  set Community(community: CommunityEntityReference) {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.isSystemAccount || permissions.canManageProperties)) {
      throw new Error('Unauthorized');
    }
    this.props.setCommunityRef(community);
  }

  set Owner(owner: MemberEntityReference) {
    if (!this.visa.determineIf((permissions) => permissions.isSystemAccount || permissions.canManageProperties)) {
      throw new Error('Unauthorized');
    }
    this.props.setOwnerRef(owner);
  }

  set PropertyName(propertyName: string) {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.isSystemAccount || permissions.canManageProperties)) {
      throw new Error('Unauthorized');
    }
    this.props.propertyName = new ValueObjects.PropertyName(propertyName).valueOf();
  }

  set PropertyType(propertyType: string) {
    if (!this.visa.determineIf((permissions) => permissions.isSystemAccount || permissions.canManageProperties)) {
      throw new Error('Unauthorized');
    }
    this.props.propertyType = new ValueObjects.PropertyType(propertyType).valueOf();
  }

  set ListedForSale(listedForSale: boolean) {
    if (
      !this.visa.determineIf(
        (permissions) => permissions.isSystemAccount || permissions.canManageProperties || (permissions.canEditOwnProperty && permissions.isEditingOwnProperty)
      )
    ) {
      throw new Error('Unauthorized');
    }
    this.props.listedForSale = listedForSale;
  }

  set ListedForRent(listedForRent: boolean) {
    if (
      !this.visa.determineIf(
        (permissions) => permissions.isSystemAccount || permissions.canManageProperties || (permissions.canEditOwnProperty && permissions.isEditingOwnProperty)
      )
    ) {
      throw new Error('Unauthorized');
    }
    this.props.listedForRent = listedForRent;
  }

  set ListedForLease(listedForLease: boolean) {
    if (
      !this.visa.determineIf(
        (permissions) => permissions.isSystemAccount || permissions.canManageProperties || (permissions.canEditOwnProperty && permissions.isEditingOwnProperty)
      )
    ) {
      throw new Error('Unauthorized');
    }
    this.props.listedForLease = listedForLease;
  }

  set ListedInDirectory(listedInDirectory: boolean) {
    if (
      !this.visa.determineIf(
        (permissions) => permissions.isSystemAccount || permissions.canManageProperties || (permissions.canEditOwnProperty && permissions.isEditingOwnProperty)
      )
    ) {
      throw new Error('Unauthorized');
    }
    this.props.listedInDirectory = listedInDirectory;
  }

  set Tags(tags: string[]) {
    if (
      !this.visa.determineIf(
        (permissions) => permissions.isSystemAccount || permissions.canManageProperties || (permissions.canEditOwnProperty && permissions.isEditingOwnProperty)
      )
    ) {
      throw new Error('Unauthorized');
    }
    this.props.tags = tags;
  }

  set Hash(hash: string) {
    if (
      !this.visa.determineIf(
        (permissions) => permissions.isSystemAccount || permissions.canManageProperties || (permissions.canEditOwnProperty && permissions.isEditingOwnProperty)
      )
    ) {
      throw new Error('Unauthorized');
    }
    this.props.hash = hash;
  }

  set LastIndexed(lastIndexed: Date) {
    if (
      !this.visa.determineIf(
        (permissions) => permissions.isSystemAccount || permissions.canManageProperties || (permissions.canEditOwnProperty && permissions.isEditingOwnProperty)
      )
    ) {
      throw new Error('Unauthorized');
    }
    this.props.lastIndexed = lastIndexed;
  }

  set UpdateIndexFailedDate(updateIndexFailedDate: Date) {
    if (
      !this.visa.determineIf(
        (permissions) => permissions.isSystemAccount || permissions.canManageProperties || (permissions.canEditOwnProperty && permissions.isEditingOwnProperty)
      )
    ) {
      throw new Error('Unauthorized');
    }
    this.props.updateIndexFailedDate = updateIndexFailedDate;
  }

  //

  public requestDelete(): void {
    if (!this.isDeleted && !this.visa.determineIf((permissions) => permissions.isSystemAccount || permissions.canManageProperties)) {
      throw new Error('You do not have permission to delete this property');
    }
    super.isDeleted = true;
    this.addIntegrationEvent(PropertyDeletedEvent, { id: this.props.id });
  }

  public override onSave(isModified: boolean): void {
    if (isModified && !super.isDeleted) {
      this.addIntegrationEvent(PropertyUpdatedEvent, { id: this.props.id });
    }
  }
}
