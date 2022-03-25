import { Entity, EntityProps } from '../../shared/entity';
import { DomainExecutionContext } from '../context';
import * as ValueObjects from './additional-amenity-value-objects';

export interface AdditionalAmenityProps extends EntityProps {
  category: string;
  amenities: string[];
}

export interface AdditionalAmenityReference extends Readonly<AdditionalAmenityProps> {}

export class AdditionalAmenity extends Entity<AdditionalAmenityProps> implements AdditionalAmenityReference {
  constructor(props: AdditionalAmenityProps, private readonly context: DomainExecutionContext) { super(props); }

  get category() {return this.props.category;}
  get amenities() {return this.props.amenities;}

  requestSetCategory(category: ValueObjects.Category) {
    this.props.category = category.valueOf();
  }
  requestSetAmenities(amenities: ValueObjects.Amenities) {
    this.props.amenities = amenities.valueOf();
  }
}