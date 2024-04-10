export interface ValueObjectProps {
}

export abstract class ValueObject<PropType extends ValueObjectProps> {
  public constructor(public readonly props: PropType) {}
}