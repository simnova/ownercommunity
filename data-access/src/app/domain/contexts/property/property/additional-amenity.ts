import { Entity, EntityProps } from '../../../../../../seedwork/domain-seedwork/entity';
import { PropertyVisa } from './property.visa';
import * as ValueObjects from './additional-amenity.value-objects';

export interface AdditionalAmenityProps extends EntityProps {
  category: string;
  amenities: string[];
}

export interface AdditionalAmenityReference extends Readonly<AdditionalAmenityProps> {}

export class AdditionalAmenity extends Entity<AdditionalAmenityProps> implements AdditionalAmenityReference {
  constructor(props: AdditionalAmenityProps, private readonly visa: PropertyVisa) {
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
