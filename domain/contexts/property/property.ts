import { Entity, EntityProps } from '../../shared/entity';
import { Community, CommunityEntityReference, CommunityProps } from '../community/community';
import { Member, MemberEntityReference, MemberProps } from '../community/member';
import { DomainExecutionContext } from '../context';
import * as ValueObjects from './property-value-objects';
import { ListingDetails, ListingDetailProps, ListingDetailsEntityReference } from './listing-detail';
import { Location, LocationEntityReference, LocationProps } from './location';
import { AggregateRoot } from '../../shared/aggregate-root';
import { PropertyVisa } from '../iam/property-visa';

export interface PropertyProps extends EntityProps {
  readonly community: CommunityProps;
  setCommunityRef(community: CommunityEntityReference): void;
  readonly location: LocationProps;
  setLocationRef(location: LocationEntityReference): void;
  readonly owner: MemberProps;
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
  schemaVersion: string;
}

export interface PropertyEntityReference extends Readonly<Omit<PropertyProps,
  'community' | 'setCommunityRef' |
  'location' | 'setLocationRef' |
  'owner' | 'setOwnerRef' |
  'listingDetail'>> {
  readonly community: CommunityEntityReference;
  readonly location: LocationEntityReference;
  readonly owner: MemberEntityReference;
  readonly listingDetail: ListingDetailsEntityReference;
}

export class Property<props extends PropertyProps> extends AggregateRoot<props> implements PropertyEntityReference {
  private readonly visa: PropertyVisa;
  constructor(props: props, private readonly context: DomainExecutionContext) { 
    super(props); 
    this.visa = context.passport.forProperty(this);
  }

  get community():CommunityEntityReference { return new Community(this.props.community, this.context); }
  get location():LocationEntityReference { return new Location(this.props.location, this.context); }
  get owner():MemberEntityReference { return new Member(this.props.owner, this.context); }
  get propertyName() { return this.props.propertyName; }
  get propertyType() { return this.props.propertyType; }
  get listedForSale() { return this.props.listedForSale; }
  get listedForRent() { return this.props.listedForRent; }
  get listedForLease() { return this.props.listedForLease; }
  get listedInDirectory() { return this.props.listedInDirectory; }
  get listingDetail() { return new ListingDetails(this.props.listingDetail, this.visa); } //editable
  get createdAt() { return this.props.createdAt; }
  get updatedAt() { return this.props.updatedAt; }
  get schemaVersion() { return this.props.schemaVersion; }


  public requestSetCommunity(community: CommunityEntityReference): void {
    if(!this.visa.determineIf(permissions => permissions.isSystemAccount || permissions.canManageProperties)) { throw new Error('Unauthorized'); }
    this.props.setCommunityRef(community);
  }
  public requestSetLocation(location: LocationEntityReference): void {
    if(!this.visa.determineIf(permissions => permissions.isSystemAccount || permissions.canManageProperties)) { throw new Error('Unauthorized'); }
    this.props.setLocationRef(location);
  }
  public requestSetOwner(owner: MemberEntityReference): void {
    if(!this.visa.determineIf(permissions => permissions.isSystemAccount || permissions.canManageProperties)) { throw new Error('Unauthorized'); }
    this.props.setOwnerRef(owner);
  }
  public requestSetPropertyName(propertyName: ValueObjects.PropertyName): void {
    if(!this.visa.determineIf(permissions => permissions.isSystemAccount || permissions.canManageProperties)) { throw new Error('Unauthorized'); }
    this.props.propertyName = propertyName.valueOf();
  }
  public requestSetPropertyType(propertyType: ValueObjects.PropertyType): void {
    if(!this.visa.determineIf(permissions => permissions.isSystemAccount || permissions.canManageProperties)) { throw new Error('Unauthorized'); }
    this.props.propertyType = propertyType.valueOf();
  }
  public requestSetListedForSale(listedForSale: boolean): void {
    if(!this.visa.determineIf(permissions => permissions.isSystemAccount || permissions.canManageProperties || (permissions.canEditOwnProperty && permissions.isEditingOwnProperty))) { throw new Error('Unauthorized'); }
    this.props.listedForSale = listedForSale;
  }
  public requestSetListedForRent(listedForRent: boolean): void {
    if(!this.visa.determineIf(permissions => permissions.isSystemAccount || permissions.canManageProperties || (permissions.canEditOwnProperty && permissions.isEditingOwnProperty))) { throw new Error('Unauthorized'); }
    this.props.listedForRent = listedForRent;
  }
  public requestSetListedForLease(listedForLease: boolean): void {
    if(!this.visa.determineIf(permissions => permissions.isSystemAccount || permissions.canManageProperties || (permissions.canEditOwnProperty && permissions.isEditingOwnProperty))) { throw new Error('Unauthorized'); }
    this.props.listedForLease = listedForLease;
  }
  public requestSetListedInDirectory(listedInDirectory: boolean): void {
    if(!this.visa.determineIf(permissions => permissions.isSystemAccount || permissions.canManageProperties || (permissions.canEditOwnProperty && permissions.isEditingOwnProperty))) { throw new Error('Unauthorized'); }
    this.props.listedInDirectory = listedInDirectory;
  }
  
}

export interface PropertyPermissions {
  canManageProperties: boolean;
  canEditOwnProperty: boolean;
  isEditingOwnProperty: boolean;
  isSystemAccount: boolean;
} 