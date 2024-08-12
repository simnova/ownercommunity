import { Entity, EntityProps } from '../../../../../../seedwork/domain-seedwork/entity';
import { PropertyVisa } from './property.visa';
import * as ValueObjects from './property-listing-detail-additional-amenity.value-objects';

export interface PropertyListingDetailAdditionalAmenityProps extends EntityProps {
  category: string;
  amenities: string[];
}

export interface PropertyListingDetailAdditionalAmenityReference extends Readonly<PropertyListingDetailAdditionalAmenityProps> {}

export class PropertyListingDetailAdditionalAmenity extends Entity<PropertyListingDetailAdditionalAmenityProps> implements PropertyListingDetailAdditionalAmenityReference {
  constructor(props: PropertyListingDetailAdditionalAmenityProps, private readonly visa: PropertyVisa) {
    super(props);
  }

  get category() {
    return this.props.category;
  }
  get amenities() {
    return this.props.amenities;
  }

  private validateVisa() {
    if (!this.visa.determineIf((permissions) => permissions.canManageProperties || (permissions.canEditOwnProperty && permissions.isEditingOwnProperty))) {
      throw new Error('You do not have permission to update this listing');
    }
  }

  // using set from TS 5.1

  set Category(category: string) {
    this.validateVisa();
    this.props.category = new ValueObjects.Category(category).valueOf();
  }

  set Amenities(amenities: string[]) {
    this.validateVisa();
    this.props.amenities = new ValueObjects.Amenities(amenities).valueOf();
  }
}
