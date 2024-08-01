import { Entity, EntityProps } from '../../../../../../seedwork/domain-seedwork/entity';
import { DomainExecutionContext } from '../../../domain-execution-context';
import { CommunityVisa } from "../community.visa";
import { EndUser, EndUserEntityReference, EndUserProps } from '../../users/end-user/end-user';
import * as ValueObjects from './account.value-objects';

export interface AccountPropValues extends EntityProps {
  firstName: string;
  lastName: string;
  user: EndUserProps;
  setUserRef: (user: EndUserProps) => void;
  statusCode: string;
  createdBy: EndUserProps;
  setCreatedByRef: (createdBy: EndUserProps) => void;
}

export interface AccountProps extends AccountPropValues {}

export interface AccountEntityReference extends Readonly<Omit<AccountPropValues, 'user' | 'setUserRef' | 'createdBy' | 'setCreatedByRef'>> {
  readonly user: EndUserEntityReference;
  readonly createdBy: EndUserEntityReference;
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
  get user(): EndUserEntityReference {
    return new EndUser(this.props.user);
  }
  get statusCode(): string {
    return this.props.statusCode;
  }
  get createdBy(): EndUserEntityReference {
    return new EndUser(this.props.createdBy);
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

  set user(user: EndUserProps) {
    this.validateVisa();
    this.props.setUserRef(user);
  }

  set statusCode(statusCode: ValueObjects.AccountStatusCode) {
    if (!this.visa.determineIf((permissions) => permissions.isSystemAccount || permissions.canManageMembers)) {
      throw new Error('You do not have permission to update this account');
    }
    this.props.statusCode = statusCode.valueOf();
  }

  set createdBy(createdBy: EndUserProps) {
    this.validateVisa();
    this.props.setCreatedByRef(createdBy);
  }
}
