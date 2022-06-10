import { AggregateRoot } from '../../shared/aggregate-root';
import { Entity, EntityProps } from '../../shared/entity';
import { DomainExecutionContext } from '../context';
import { PropertyVisa } from '../iam/property-visa';

export interface LocationProps extends EntityProps {
  id: string;
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
  createdAt: Date;
  updatedAt: Date;
  schemaVersion: string;
}

export interface LocationEntityReference {
  readonly id?: string;
  readonly position?:  {
    readonly type: string;
    readonly coordinates: number[];
  } 
  readonly address?: {
    readonly streetNumber: string;
    readonly streetName: string;
    readonly municipality: string;
    readonly municipalitySubdivision: string;
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
  };
}


export class Location<props extends LocationProps> extends AggregateRoot<props> implements LocationEntityReference {
  private readonly visa: PropertyVisa;
  constructor(props: props, context:DomainExecutionContext) { super(props); }
  get id(): string {return this.props.id;}
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
    }
    return {
      get streetNumber(): string { return this.props.address.streetNumber; },
      get streetName(): string { return this.props.address.streetName; },
      get municipality(): string { return this.props.address.municipality; },
      get municipalitySubdivision(): string { return this.props.address.municipalitySubdivision; },
      get countrySecondarySubdivision(): string { return this.props.address.countrySecondarySubdivision; },
      get countryTertiarySubdivision(): string { return this.props.address.countryTertiarySubdivision; },
      get countrySubdivision(): string { return this.props.address.countrySubdivision; },
      get countrySubdivisionName(): string { return this.props.address.countrySubdivisionName; },
      get postalCode(): string { return this.props.address.postalCode; },
      get extendedPostalCode(): string { return this.props.address.extendedPostalCode; },
      get countryCode(): string { return this.props.address.countryCode; },
      get country(): string { return this.props.address.countr; },
      get countryCodeISO3(): string { return this.props.address.countryCodeISO3; },
      get freeformAddress(): string { return this.props.address.freeformAddress; }
    }
  }

  private validateVisa() {
    if (!this.visa.determineIf((permissions) => permissions.canManageProperties || (permissions.canEditOwnProperty && permissions.isEditingOwnProperty))) {
      throw new Error('You do not have permission to update this listing');
    }
  }

  requestSetStreetName(streetName: string) {
    this.validateVisa();
    this.props.address.streetName = streetName;
  }
}


