import { ValueObject, ValueObjectProps } from "../../../../../../seedwork/domain-seedwork/value-object";

export interface PropertyLocationPositionProps extends ValueObjectProps {
    type?: string;
    coordinates?: number[];
}

export interface PropertyLocationPositionEntityReference extends Readonly<PropertyLocationPositionProps> {}

export class PropertyLocationPosition extends ValueObject<PropertyLocationPositionProps> implements PropertyLocationPositionProps {
    constructor(props: PropertyLocationPositionProps) {
        super(props);
    }

    get type () {
        return this.props.type;
    }

    get coordinates() {
        return this.props.coordinates;
    }

}