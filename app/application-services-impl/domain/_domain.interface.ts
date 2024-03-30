import { AggregateRoot } from '../../../seedwork/domain-seedwork/aggregate-root';
import { EntityProps } from '../../../seedwork/domain-seedwork/entity';
import { Repository } from '../../../seedwork/domain-seedwork/repository';

export interface DomainApplicationService<
  PropType extends EntityProps,
  Root extends AggregateRoot<PropType>,
  RepoType extends Repository<Root>
  > {
  withTransaction(func:(repo:RepoType) => Promise<void>): Promise<void>;
}