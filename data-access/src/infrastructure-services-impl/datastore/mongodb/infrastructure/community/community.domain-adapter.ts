import { Community } from '../../models/community';
import { Community as CommunityDO, CommunityProps } from '../../../../../app/domain/contexts/community/community/community';
import { MongooseDomainAdapter } from '../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-domain-adapter';
import { MongoTypeConverter } from '../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-type-converter';
import { DomainExecutionContext } from '../../../../../app/domain/domain-execution-context';
import { EndUserEntityReference, EndUserProps } from '../../../../../app/domain/contexts/users/end-user/end-user';
import { EndUserDomainAdapter } from '../users/end-user/end-user.domain-adapter';

export class CommunityConverter extends MongoTypeConverter<DomainExecutionContext, Community, CommunityDomainAdapter, CommunityDO<CommunityDomainAdapter>> {
  constructor() {
    super(CommunityDomainAdapter, CommunityDO);
  }
}

export class CommunityDomainAdapter extends MongooseDomainAdapter<Community> implements CommunityProps {
  get name() {
    return this.doc.name;
  }
  set name(name) {
    this.doc.name = name;
  }

  get domain() {
    return this.doc.domain;
  }
  set domain(domain) {
    this.doc.domain = domain;
  }

  get whiteLabelDomain() {
    return this.doc.whiteLabelDomain;
  }
  set whiteLabelDomain(whiteLabelDomain: string) {
    this.doc.whiteLabelDomain = whiteLabelDomain;
  }

  get handle() {
    return this.doc.handle;
  }
  set handle(handle) {
    this.doc.handle = handle;
  }

  get createdBy(): EndUserProps {
    if (this.doc.createdBy) {
      return new EndUserDomainAdapter(this.doc.createdBy);
    }
    return undefined;
  }
  setCreatedByRef(user: EndUserEntityReference) {
    this.doc.set('createdBy', user['props']['doc']);
  }
}
