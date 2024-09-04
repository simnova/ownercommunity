import { ValueObject, ValueObjectProps } from '../../../../../../framework/seedwork/domain-seedwork/value-object';
import { PropertyVisa } from '../property.domain-visa';
import { PropertyLocationAddress, PropertyLocationAddressEntityReference, PropertyLocationAddressProps } from './property-location-address';
import { PropertyLocationPosition, PropertyLocationPositionEntityReference, PropertyLocationPositionProps } from './property-location-position';

export interface PropertyLocationProps extends ValueObjectProps {
  readonly position: PropertyLocationPositionProps;
  readonly address: PropertyLocationAddressProps;
}

export interface PropertyLocationEntityReference extends Readonly<Omit<PropertyLocationProps, 'position' | 'address'>> {
  readonly position: PropertyLocationPositionEntityReference;
  readonly address: PropertyLocationAddressEntityReference;
}

export class PropertyLocation extends ValueObject<PropertyLocationProps> implements PropertyLocationEntityReference {
  constructor(props: PropertyLocationProps, private readonly visa: PropertyVisa) {
    super(props);
  }

  get position() {
    return new PropertyLocationPosition(this.props.position);
  }

  get address() {
    return new PropertyLocationAddress(this.props.address);
  }

  private validateVisa() {
    if (!this.visa.determineIf((permissions) => permissions.canManageProperties || (permissions.canEditOwnProperty && permissions.isEditingOwnProperty))) {
      throw new Error('You do not have permission to update this listing');
    }
  }

  // using set from TS 5.1

  set Address(address: PropertyLocationAddressProps) {
    this.validateVisa();

    this.props.address.country = address.country;
    this.props.address.countryCode = address.countryCode;
    this.props.address.countryCodeISO3 = address.countryCodeISO3;
    this.props.address.countrySubdivision = address.countrySubdivision;
    this.props.address.countrySubdivisionName = address.countrySubdivisionName;
    this.props.address.countryTertiarySubdivision = address.countryTertiarySubdivision;
    this.props.address.countrySecondarySubdivision = address.countrySecondarySubdivision;
    this.props.address.municipality = address.municipality;
    this.props.address.municipalitySubdivision = address.municipalitySubdivision;
    this.props.address.localName = address.localName;
    this.props.address.postalCode = address.postalCode;
    this.props.address.extendedPostalCode = address.extendedPostalCode;
    this.props.address.streetName = address.streetName;
    this.props.address.streetNumber = address.streetNumber;
    this.props.address.freeformAddress = address.freeformAddress;
    this.props.address.streetNameAndNumber = address.streetNameAndNumber;
    this.props.address.routeNumbers = address.routeNumbers;
    this.props.address.crossStreet = address.crossStreet;
  }

  set Position(position: PropertyLocationPositionProps) {
    this.validateVisa();
    this.props.position.coordinates = position.coordinates;
  }
}
