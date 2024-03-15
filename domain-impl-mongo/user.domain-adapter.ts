import { User } from '../infrastructure/data-sources/cosmos-db/models/user';
import { DomainExecutionContext } from '../domain/contexts/context';
import { User as UserDO, UserProps } from '../domain/contexts/user/user';
import { MongooseDomainAdapter } from '../domain-seedwork-mongo/mongo-domain-adapter';
import { MongoTypeConverter } from '../domain-seedwork-mongo/mongo-type-converter';

export class UserConverter extends MongoTypeConverter<DomainExecutionContext, User, UserDomainAdapter, UserDO<UserDomainAdapter>> {
  constructor() {
    super(UserDomainAdapter, UserDO);
  }
}

export class UserDomainAdapter extends MongooseDomainAdapter<User> implements UserProps {
  get externalId() {
    return this.doc.externalId;
  }
  set externalId(externalId) {
    this.doc.externalId = externalId;
  }

  get firstName() {
    return this.doc.firstName;
  }
  set firstName(firstName) {
    this.doc.firstName = firstName;
  }

  get lastName() {
    return this.doc.lastName;
  }
  set lastName(lastName) {
    this.doc.lastName = lastName;
  }

  get email() {
    return this.doc.email;
  }
  set email(email) {
    this.doc.email = email;
  }
}
