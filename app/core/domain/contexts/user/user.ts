import { UserCreatedEvent } from '../../events/types/user-created';
import { AggregateRoot } from '../../../../../seedwork/domain-seedwork/aggregate-root';
import { EntityProps } from '../../../../../seedwork/domain-seedwork/entity';
import { DomainExecutionContext } from '../domain-execution-context';
import * as ValueObjects from './user.value-objects';

export interface UserProps extends EntityProps {
  externalId:string;
  firstName: string;
  lastName: string;
  email: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly schemaVersion: string;
}

export interface UserEntityReference extends Readonly<UserProps> {}

export class User<props extends UserProps> extends AggregateRoot<props> implements UserEntityReference  {
  constructor(props: props, context?:DomainExecutionContext) { super(props); }

  get id(): string {return this.props.id;}
  get externalId(): string {return this.props.externalId;}
  get firstName(): string {return this.props.firstName;}
  get lastName(): string {return this.props.lastName;}
  get email(): string {return this.props.email;}
  get updatedAt(): Date {return this.props.updatedAt;}
  get createdAt(): Date {return this.props.createdAt;}
  get schemaVersion(): string {return this.props.schemaVersion;}

  public static getReadOnlyUser<readonlyProps extends UserProps> (props:readonlyProps): UserEntityReference{
    return new User(props);
  }

  public static getNewUser<props extends UserProps> (newProps:props,externalId:string,firstName:string,lastName:string): User<props> {
    newProps.externalId = externalId;
    let user = new User(newProps);
    user.setExternalId(externalId);
    user.setFirstName(firstName);
    user.setLastName(lastName);
    user.MarkAsNew();
    return user;
  }

  private MarkAsNew(): void {
    this.addIntegrationEvent(UserCreatedEvent,{userId: this.props.id});
  }

  public setFirstName(firstName:string): void {
    this.props.firstName = (new ValueObjects.FirstName(firstName)).valueOf();
  }

  public setLastName(lastName:string): void {
    this.props.lastName = (new ValueObjects.LastName(lastName)).valueOf();
  }

  public setEmail(email:string): void {
    this.props.email = (new ValueObjects.Email(email)).valueOf();
  }

  public setExternalId(externalId:string): void {
    this.props.externalId = (new ValueObjects.ExternalId(externalId)).valueOf();
  }

}

export interface UserPermissions {
  canManageUser: boolean;
} 