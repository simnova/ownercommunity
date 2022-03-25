import { Entity, EntityProps } from '../../shared/entity';
import { DomainExecutionContext } from '../context';
import { User, UserEntityReference, UserProps } from '../user/user';
import * as ValueObjects from './account-value-objects';

export interface AccountPropValues extends EntityProps {
  firstName: string;
  lastName: string;
  user: UserProps;
  setUserRef: (user: UserProps) => void;
  statusCode: string;
  createdBy: UserProps;
  setCreatedByRef: (createdBy: UserProps) => void;
}

export interface AccountProps extends AccountPropValues {}

export interface AccountEntityReference extends Readonly<Omit<AccountPropValues,
  'user' | 'setUserRef' | 
  'createdBy' | 'setCreatedByRef' >> {
  readonly user: UserEntityReference;
  readonly createdBy: UserEntityReference;
}

export class Account extends Entity<AccountProps> implements AccountEntityReference {
  constructor(props: AccountProps, private readonly context: DomainExecutionContext) { super(props); }

  get firstName(): string {return this.props.firstName;}
  get lastName(): string {return this.props.lastName;}
  get user(): UserEntityReference {return new User(this.props.user,this.context);}
  get statusCode(): string {return this.props.statusCode;}
  get createdBy(): UserEntityReference {return new User(this.props.createdBy, this.context);}

  requestSetFirstName(firstName: ValueObjects.FirstName) {
    this.props.firstName = firstName.valueOf();
  }
  requestSetLastName(lastName: ValueObjects.LastName) {
    this.props.lastName = lastName.valueOf();
  }
  requestSetUser(user: UserProps) {
    this.props.setUserRef(user);
  }
  requestSetStatusCode(statusCode: ValueObjects.AccountStatusCode) {
    this.props.statusCode = statusCode.valueOf();
  }
  requestSetCreatedBy(createdBy: UserProps) {
    this.props.setCreatedByRef(createdBy);
  }

}