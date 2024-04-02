import { Entity, EntityProps } from '../../../../../seedwork/domain-seedwork/entity';
import { DomainExecutionContext } from '../domain-execution-context';
import { CommunityVisa } from '../iam/community-visa';
import { User, UserEntityReference, UserProps } from '../user/user';
import * as ValueObjects from './account.value-objects';

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

export interface AccountEntityReference extends Readonly<Omit<AccountPropValues, 'user' | 'setUserRef' | 'createdBy' | 'setCreatedByRef'>> {
  readonly user: UserEntityReference;
  readonly createdBy: UserEntityReference;
}

export class Account extends Entity<AccountProps> implements AccountEntityReference {
  constructor(props: AccountProps, private readonly context: DomainExecutionContext, private readonly visa: CommunityVisa) {
    super(props);
  }

  get firstName(): string {
    return this.props.firstName;
  }
  get lastName(): string {
    return this.props.lastName;
  }
  get user(): UserEntityReference {
    return new User(this.props.user, this.context);
  }
  get statusCode(): string {
    return this.props.statusCode;
  }
  get createdBy(): UserEntityReference {
    return new User(this.props.createdBy, this.context);
  }

  private validateVisa() {
    if (
      !this.visa.determineIf(
        (permissions) => permissions.isSystemAccount || permissions.canManageMembers || (permissions.canEditOwnMemberAccounts && permissions.isEditingOwnMemberAccount)
      )
    ) {
      throw new Error('You do not have permission to update this account');
    }
  }

  // using ts 5.1 setters
  set firstName(firstName: ValueObjects.FirstName) {
    this.validateVisa();
    this.props.firstName = firstName.valueOf();
  }

  set lastName(lastName: ValueObjects.LastName) {
    this.validateVisa();
    this.props.lastName = lastName.valueOf();
  }

  set user(user: UserProps) {
    this.validateVisa();
    this.props.setUserRef(user);
  }

  set statusCode(statusCode: ValueObjects.AccountStatusCode) {
    if (!this.visa.determineIf((permissions) => permissions.isSystemAccount || permissions.canManageMembers)) {
      throw new Error('You do not have permission to update this account');
    }
    this.props.statusCode = statusCode.valueOf();
  }

  set createdBy(createdBy: UserProps) {
    this.validateVisa();
    this.props.setCreatedByRef(createdBy);
  }
}
