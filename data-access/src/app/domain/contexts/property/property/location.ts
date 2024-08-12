import { ValueObject, ValueObjectProps } from '../../../../../../seedwork/domain-seedwork/value-object';
import { PropertyVisa } from './property.visa';
import { Address, AddressEntityReference, AddressProps } from './address';
import { Position, PositionEntityReference, PositionProps } from './position';

export interface LocationProps extends ValueObjectProps {
  readonly position: PositionProps;
  readonly address: AddressProps;
}

export interface LocationEntityReference extends Readonly<Omit<LocationProps, 'position' | 'address'>> {
  readonly position: PositionEntityReference;
  readonly address: AddressEntityReference;
}

export class Location extends ValueObject<LocationProps> implements LocationEntityReference {
  constructor(props: LocationProps, private readonly visa: PropertyVisa) {
    super(props);
  }

  get position() {
    return new Position(this.props.position);
  }

  get address() {
    return new Address(this.props.address);
  }

  private validateVisa() {
    if (!this.visa.determineIf((permissions) => permissions.canManageProperties || (permissions.canEditOwnProperty && permissions.isEditingOwnProperty))) {
      throw new Error('You do not have permission to update this listing');
    }
  }

  // using set from TS 5.1

  set Address(address: AddressProps) {
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

  set Position(position: PositionProps) {
    this.validateVisa();
    this.props.position.coordinates = position.coordinates;
  }
}
