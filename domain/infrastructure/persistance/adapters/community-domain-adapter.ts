import { Community } from '../../../../infrastructure/data-sources/cosmos-db/models/community';
import { Community as CommunityDO, CommunityProps } from '../../../../domain/contexts/community/community';
import { MongooseDomainAdapter } from '../mongo-domain-adapter';
import { MongoTypeConverter } from '../mongo-type-converter';
import { DomainExecutionContext } from '../../../contexts/context';
import { UserEntityReference, UserProps } from '../../../contexts/user/user';
import { UserDomainAdapter } from './user-domain-adapter';

export class CommunityConverter extends MongoTypeConverter<DomainExecutionContext,Community,CommunityDomainAdapter,CommunityDO<CommunityDomainAdapter>> {
  constructor() {
    super(CommunityDomainAdapter, CommunityDO);
  }
}

export class CommunityDomainAdapter extends MongooseDomainAdapter<Community> implements CommunityProps {
  constructor(doc: Community) { super(doc); }

  get name() {return this.doc.name;}
  set name(name) {this.doc.name = name;}

  get domain() {return this.doc.domain;}
  set domain(domain) {this.doc.domain = domain;}

  get whiteLabelDomain() {return this.doc.whiteLabelDomain;}
  set whiteLabelDomain(whiteLabelDomain: string) {this.doc.whiteLabelDomain = whiteLabelDomain;}

  get handle() {return this.doc.handle;}
  set handle(handle) {this.doc.handle = handle;}

  get createdBy(): UserProps {
    if(this.doc.createdBy) {return new UserDomainAdapter(this.doc.createdBy);}
  }
  setCreatedByRef(user: UserEntityReference) {
    this.doc.set('createdBy',user['props']['doc']);
  }

}