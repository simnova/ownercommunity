import { Community } from '../../../../infrastructure/data-sources/cosmos-db/models/community';
import { Community as CommunityDO, CommunityProps } from '../../../../domain/contexts/community/community';
import { MongooseDomainAdapter } from '../mongo-domain-adapter';
import { MongoTypeConverter } from '../mongo-type-converter';
import { DomainExecutionContext } from '../../../contexts/context';

export class CommunityConverter extends MongoTypeConverter<DomainExecutionContext,Community,CommunityDomainAdapter,CommunityDO<CommunityDomainAdapter>> {
  constructor() {
    super(CommunityDomainAdapter, CommunityDO);
  }
}

export class CommunityDomainAdapter extends MongooseDomainAdapter<Community> implements CommunityProps {
  constructor(props: Community) { super(props); }

  get name() {return this.props.name;}
  set name(name) {this.props.name = name;}

  get domain() {return this.props.domain;}
  set domain(domain) {this.props.domain = domain;}

  get whiteLabelDomain() {return this.props.whiteLabelDomain;}
  set whiteLabelDomain(whiteLabelDomain: string) {this.props.whiteLabelDomain = whiteLabelDomain;}

  get handle() {return this.props.handle;}
  set handle(handle) {this.props.handle = handle;}
}