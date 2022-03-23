import { Entity, EntityProps } from '../../shared/entity';
import { DomainExecutionContext } from '../context';
import { User, UserEntityReference, UserProps } from '../user/user';

export interface AccountPropValues extends EntityProps {
  firstName: string;
  lastName: string;
  user: UserProps;
  statusCode: string;
  createdBy: UserProps;
}

export interface AccountProps extends AccountPropValues {}

export interface AccountEntityReference extends Readonly<Omit<AccountPropValues,'user' | 'createdBy'>> {
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

}