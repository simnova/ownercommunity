import { User } from '../../../../infrastructure/data-sources/cosmos-db/models/user';
import { DomainExecutionContext } from '../../../contexts/context';
import { User as UserDO, UserProps } from '../../../contexts/user/user';
import { MongooseDomainAdapter } from '../mongo-domain-adapter';
import { MongoTypeConverter } from '../mongo-type-converter';

export class UserConverter extends MongoTypeConverter<DomainExecutionContext,User,UserDomainAdapter,UserDO<UserDomainAdapter>> {
  constructor() {
    super(UserDomainAdapter, UserDO);
  }
}

export class UserDomainAdapter extends MongooseDomainAdapter<User> implements UserProps {
  constructor(props: User) { super(props); }

  get externalId() {return this.props.externalId;}
  set externalId(externalId) {this.props.externalId = externalId;}

  get firstName() {return this.props.firstName;}
  set firstName(firstName) {this.props.firstName = firstName;}

  get lastName() {return this.props.lastName;}
  set lastName(lastName) {this.props.lastName = lastName;}

  get email() {return this.props.email;}
  set email(email) {this.props.email = email;}
}