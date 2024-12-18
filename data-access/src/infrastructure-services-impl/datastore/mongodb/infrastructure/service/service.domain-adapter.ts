import { Service } from '../../models/service';
import { Service as ServiceDO, ServiceProps } from '../../../../../app/domain/contexts/community/service/service';
import { MongooseDomainAdapter } from '../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-domain-adapter';
import { MongoTypeConverter } from '../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-type-converter';

import { CommunityProps } from '../../../../../app/domain/contexts/community/community/community';
import { CommunityDomainAdapter } from '../community/community.domain-adapter';
import { DomainExecutionContext } from '../../../../../app/domain/domain-execution-context';
import { ServiceVisa } from '../../../../../app/domain/contexts/community/service/service.visa';
import { InfrastructureContext } from '../../../../../app/init/infrastructure-context';

export class ServiceConverter extends MongoTypeConverter<
  DomainExecutionContext, 
  Service, 
  ServiceDomainAdapter,
  ServiceVisa, 
  ServiceDO<ServiceDomainAdapter>,
  InfrastructureContext
> {
  constructor() {
    super(ServiceDomainAdapter, ServiceDO);
  }
}

export class ServiceDomainAdapter extends MongooseDomainAdapter<Service, InfrastructureContext> implements ServiceProps {
  get serviceName() {
    return this.doc.serviceName;
  }
  set serviceName(serviceName) {
    this.doc.serviceName = serviceName;
  }

  get description() {
    return this.doc.description;
  }
  set description(description) {
    this.doc.description = description;
  }

  get community() {
    if (this.doc.community && !this.doc.populated('community')) {
      console.warn('Community not populated - may want to look at repository populate', this.doc.community);
    }
    return this.doc.community ? new CommunityDomainAdapter(this.doc.community, this.infrastructureContext) : undefined;
  }
  setCommunityRef(community: CommunityProps) {
    this.doc.set('community', community['props']['doc']);
  }

  get isActive() {
    return this.doc.isActive;
  }
  set isActive(isActive) {
    this.doc.isActive = isActive;
  }
}
