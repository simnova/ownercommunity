import { AggregateRoot } from '../../shared/aggregate-root';
import { Entity, EntityProps } from '../../shared/entity';
import { DomainExecutionContext } from '../context';
import { PropertyVisa } from '../iam/property-visa';
import { AddressEntityReference } from './address';

export interface LocationProps extends EntityProps {
  position:  {
    type: string;
    coordinates: number[];
  } 
 //readonly address: AddressProps;
  address: {
    streetNumber: string;
    streetName: string;
    municipality: string;
    municipalitySubdivision: string;
    localName: string;
    countrySecondarySubdivision: string;
    countryTertiarySubdivision: string;
    countrySubdivision: string;
    countrySubdivisionName: string;
    postalCode: string;
    extendedPostalCode: string;
    countryCode: string;
    country: string;
    countryCodeISO3: string;
    freeformAddress: string;
  }
}

export interface LocationEntityReference {
  readonly position?:  {
    readonly type: string;
    readonly coordinates: number[];
  } 
  readonly address?: {
    readonly streetNumber: string;
    readonly streetName: string;
    readonly municipality: string;
    readonly municipalitySubdivision: string;
    readonly localName: string;
    readonly countrySecondarySubdivision: string;
    readonly countryTertiarySubdivision: string;
    readonly countrySubdivision: string;
    readonly countrySubdivisionName: string;
    readonly postalCode: string;
    readonly extendedPostalCode: string;
    readonly countryCode: string;
    readonly country: string;
    readonly countryCodeISO3: string;
    readonly freeformAddress: string;
    readonly streetNameAndNumber: string;
    readonly routeNumbers: string;
    readonly crossStreet: string;
  };
}


export class Location extends Entity<LocationProps> implements LocationEntityReference {
  
  constructor(props: LocationProps, private readonly visa: PropertyVisa) { super(props); }
  get position() { 
    if(! this.props.position) {
      return undefined;
    }
    return {
      get type(): string { return this.props.position.type;},
      get coordinates(): number[] { return this.props.position.coordinates;}
    };
  }

  get address() {
    if(! this.props.address) {
      return undefined;
      console.error('Address is not defined');
    }
    return {
      get streetNumber(): string { return this.props.address.streetNumber; },
      get streetName(): string { return this.props.address.streetName; },
      get municipality(): string { return this.props.address.municipality; },
      get municipalitySubdivision(): string { return this.props.address.municipalitySubdivision; },
      get localName(): string { return this.props.address.localName; },
      get countrySecondarySubdivision(): string { return this.props.address.countrySecondarySubdivision; },
      get countryTertiarySubdivision(): string { return this.props.address.countryTertiarySubdivision; },
      get countrySubdivision(): string { return this.props.address.countrySubdivision; },
      get countrySubdivisionName(): string { return this.props.address.countrySubdivisionName; },
      get postalCode(): string { return this.props.address.postalCode; },
      get extendedPostalCode(): string { return this.props.address.extendedPostalCode; },
      get countryCode(): string { return this.props.address.countryCode; },
      get country(): string { return this.props.address.country; },
      get countryCodeISO3(): string { return this.props.address.countryCodeISO3; },
      get freeformAddress(): string { return this.props.address.freeformAddress; },
      get streetNameAndNumber(): string { return this.props.address.streetNameAndNumber; },
      get routeNumbers(): string { return this.props.address.routeNumbers; },
      get crossStreet(): string { return this.props.address.crossStreet; },
    }
  }

  private validateVisa() {
    if (!this.visa.determineIf((permissions) => permissions.canManageProperties || (permissions.canEditOwnProperty && permissions.isEditingOwnProperty))) {
      throw new Error('You do not have permission to update this listing');
    }
  }

  public requestSetAddress(address: LocationProps["address"]) {
    this.validateVisa();
    console.log("props ", this.props);
    console.log("address ", address)
    //this.props.address = address;
    // this.props.address = {...address};
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
    console.log("post", this.props)
  }
  // requestSetStreetName(streetName: string) {
  //   this.validateVisa();
  //   this.props.address.streetName = streetName;
  // }
}


