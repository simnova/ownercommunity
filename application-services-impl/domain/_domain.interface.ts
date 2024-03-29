import { AggregateRoot } from '../../domain-seedwork/aggregate-root';
import { EntityProps } from '../../domain-seedwork/entity';
import { Repository } from '../../domain-seedwork/repository';

export interface DomainApplicationService<
  PropType extends EntityProps,
  Root extends AggregateRoot<PropType>,
  RepoType extends Repository<Root>
  > {
  withTransaction(func:(repo:RepoType) => Promise<void>): Promise<void>;
}