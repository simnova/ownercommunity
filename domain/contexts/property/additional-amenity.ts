import { Entity, EntityProps } from '../../shared/entity';
import { DomainExecutionContext } from '../context';
import { PropertyVisa } from '../iam/property-visa';
import * as ValueObjects from './additional-amenity.value-objects';

export interface AdditionalAmenityProps extends EntityProps {
  category: string;
  amenities: string[];
}

export interface AdditionalAmenityReference extends Readonly<AdditionalAmenityProps> {}

export class AdditionalAmenity extends Entity<AdditionalAmenityProps> implements AdditionalAmenityReference {
  constructor(props: AdditionalAmenityProps, private readonly visa: PropertyVisa) { super(props); }

  get category() {return this.props.category;}
  get amenities() {return this.props.amenities;}

  private validateVisa(){
    if(!this.visa.determineIf((permissions) => 
      permissions.canManageProperties ||
      (permissions.canEditOwnProperty && permissions.isEditingOwnProperty))) {
      throw new Error('You do not have permission to update this listing');
    }
  }

  requestSetCategory(category: ValueObjects.Category) {
    this.validateVisa();
    this.props.category = category.valueOf();
  }
  requestSetAmenities(amenities: ValueObjects.Amenities) {
    this.validateVisa()
    this.props.amenities = amenities.valueOf();
  }
}