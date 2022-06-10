import { Entity, EntityProps } from "../../shared/entity";
import { PropertyVisa } from "../iam/property-visa";

export interface AddressProps extends EntityProps {
    streetNumber: string;
    streetName: string;
    municipality: string;
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

export interface AddressEntityReference extends Readonly<AddressProps> {}

export class Address extends Entity<AddressProps> implements AddressEntityReference {
    constructor(props: AddressProps, private readonly visa: PropertyVisa) {
        super(props);
    }

    get streetNumber() {
        return this.props.streetNumber;
    }

    get streetName() {
        return this.props.streetName;
    }

    get municipality() {
        return this.props.municipality;
    }

    get localName() {
        return this.props.localName;
    }

    get countrySecondarySubdivision() {
        return this.props.countrySecondarySubdivision;
    }

    get countryTertiarySubdivision() {
        return this.props.countryTertiarySubdivision;
    }

    get countrySubdivision() {
        return this.props.countrySubdivision;
    }

    get countrySubdivisionName() {
        return this.props.countrySubdivisionName;
    }

    get postalCode() {
        return this.props.postalCode;
    }

    get extendedPostalCode() {
        return this.props.extendedPostalCode;
    }

    get countryCode() {
        return this.props.countryCode;
    }

    get country() {
        return this.props.country;
    }

    get countryCodeISO3() {
        return this.props.countryCodeISO3;
    }

    get freeformAddress() {
        return this.props.freeformAddress;
    }

    get id() {
        return this.props.id;
    }

    private validateVisa(){
        if(!this.visa.determineIf((permissions) => 
          permissions.canManageProperties ||
          (permissions.canEditOwnProperty && permissions.isEditingOwnProperty))) {
          throw new Error('You do not have permission to update this listing');
        }
      }

    
}

