import { Community } from '../../../../infrastructure/data-sources/cosmos-db/models/community';
import { Community as CommunityDO, CommunityProps } from '../../../../domain/contexts/community/community';
import { MongooseDomainAdapater } from '../mongo-domain-adapter';
import { MongoTypeConverter } from '../mongo-type-converter';
import { DomainExecutionContext } from '../../../contexts/context';

export class CommunityConverter extends MongoTypeConverter<DomainExecutionContext,Community,CommunityDomainAdapter,CommunityDO<CommunityDomainAdapter>> {
  constructor() {
    super(CommunityDomainAdapter, CommunityDO);
  }
}

export class CommunityDomainAdapter extends MongooseDomainAdapater<Community> implements CommunityProps {
  constructor(props: Community) { super(props); }

  get name() {return this.props.name;}
  set name(name: string) {this.props.name = name;}

  get domain() {return this.props.domain;}
  set domain(domain: string) {this.props.domain = domain;}

  get whiteLabelDomain() {return this.props.whiteLabelDomain;}
  set whiteLabelDomain(whiteLabelDomain: string) {this.props.whiteLabelDomain = whiteLabelDomain;}

  get handle() {return this.props.handle;}
  set handle(handle: string) {this.props.handle = handle;}
}