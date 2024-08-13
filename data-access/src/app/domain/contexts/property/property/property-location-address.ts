import { ValueObject, ValueObjectProps } from "../../../../../../seedwork/domain-seedwork/value-object";

export interface PropertyLocationAddressProps extends ValueObjectProps {
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
    streetNameAndNumber: string;
    routeNumbers: string;
    crossStreet: string;
}

export interface PropertyLocationAddressEntityReference extends Readonly<PropertyLocationAddressProps> {}

export class PropertyLocationAddress extends ValueObject<PropertyLocationAddressProps> implements PropertyLocationAddressEntityReference {
    constructor(props: PropertyLocationAddressProps) {
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

    get municipalitySubdivision() {
        return this.props.municipalitySubdivision;
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

    get streetNameAndNumber() {
        return this.props.streetNameAndNumber;
    }

    get routeNumbers() {
        return this.props.routeNumbers;
    }

    get crossStreet() {
        return this.props.crossStreet;
    }
    
}

