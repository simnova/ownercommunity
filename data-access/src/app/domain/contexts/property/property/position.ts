import { ValueObject, ValueObjectProps } from "../../../../../../seedwork/domain-seedwork/value-object";

export interface PositionProps extends ValueObjectProps {
    type?: string;
    coordinates?: number[];
}

export interface PositionEntityReference extends Readonly<PositionProps> {}

export class Position extends ValueObject<PositionProps> implements PositionProps {
    constructor(props: PositionProps) {
        super(props);
    }

    get type () {
        return this.props.type;
    }

    get coordinates() {
        return this.props.coordinates;
    }

}