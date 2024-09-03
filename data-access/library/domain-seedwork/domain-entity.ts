export interface DomainEntityProps {
  readonly id: string;
}

export abstract class DomainEntity<PropType extends DomainEntityProps> {
  get id(): string {
    return this.props.id;
  }

  public constructor(public readonly props: PropType) {}
}
