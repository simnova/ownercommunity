import { Entity, EntityProps } from '../../../../../seedwork/domain-seedwork/entity';
import { DomainExecutionContext } from '../domain-execution-context';
import { CommunityVisa } from '../iam/community-visa';
import * as ValueObjects from './custom-view.value-objects';

export interface CustomViewPropValues extends EntityProps {
  name: string;
  type: string;
  filters: string[];
  sortOrder: string;
  columnsToDisplay: string[];
}

export interface CustomViewProps extends CustomViewPropValues {}

export interface CustomViewEntityReference extends Readonly<CustomViewPropValues> {}

export class CustomView extends Entity<CustomViewProps> implements CustomViewEntityReference {
  constructor(props: CustomViewProps, private readonly context: DomainExecutionContext, private readonly visa: CommunityVisa) {
    super(props);
  }

  get name(): string {
    return this.props.name;
  }
  get type(): string {
    return this.props.type;
  }
  get filters(): string[] {
    return this.props.filters;
  }
  get sortOrder(): string {
    return this.props.sortOrder;
  }
  get columnsToDisplay(): string[] {
    return this.props.columnsToDisplay;
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

  // implementing setters  from TS 5.1
  set name(name: ValueObjects.CustomViewName) {
    this.validateVisa();
    this.props.name = name.valueOf();
  }

  set type(type: ValueObjects.CustomViewType) {
    this.validateVisa();
    this.props.type = type.valueOf();
  }

  set order(sortOrder: ValueObjects.CustomViewSortOrder) {
    this.validateVisa();
    this.props.sortOrder = sortOrder.valueOf();
  }

  set filters(filters: ValueObjects.CustomViewFilters) {
    this.validateVisa();
    this.props.filters = filters.valueOf();
  }

  set columnsToDisplay(columnsToDisplay: ValueObjects.CustomViewColumnsToDisplay) {
    this.validateVisa();
    this.props.columnsToDisplay = columnsToDisplay.valueOf();
  }
}
