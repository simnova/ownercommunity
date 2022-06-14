import { Entity, EntityProps } from "../../shared/entity";
import { PropertyVisa } from "../iam/property-visa";

export interface PositionProps extends EntityProps {
    type: string;
    coordinates: number[];
}

export interface PositionEntityReference extends Readonly<PositionProps> {}

export class Position extends Entity<PositionProps> implements PositionProps {
    constructor(props: PositionProps, private readonly visa: PropertyVisa) {
        super(props);
    }

    get type () {
        return this.props.type;
    }

    get coordinates() {
        return this.props.coordinates;
    }

    get id() {
        return this.props.id;
    }
}