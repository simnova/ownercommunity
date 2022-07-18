import { Entity, EntityProps } from '../../shared/entity';
import { DomainExecutionContext } from '../context';

export interface CustomViewPropValues extends EntityProps {
  name: string;
  type: string;
  filters: [string];
  sortOrder: string;
}

export interface CustomViewProps extends CustomViewPropValues {}

export interface CustomViewEntityReference extends Readonly<CustomViewPropValues> {}

export class CustomView extends Entity<CustomViewProps> implements CustomViewEntityReference {
  constructor(props: CustomViewProps, private readonly context: DomainExecutionContext, private readonly visa: CommunityVisa) { super(props); }

  get name(): string {return this.props.name;}
  get type(): string {return this.props.type;}
  get filters(): [string] {return this.props.filters;}
  get sortOrder(): string {return this.props.sortOrder;}

  private validateVisa(){
    if(!this.visa.determineIf((permissions) => 
      permissions.isSystemAccount || 
      permissions.canManageMembers ||
      (permissions.canEditOwnMemberAccounts && permissions.isEditingOwnMemberAccount))) {
      throw new Error('You do not have permission to update this account');
    }
  }

  requestSetName(name: ValueObjects.CustomViewName) {
    this.validateVisa();
    this.props.name = name.valueOf();
  }

  requestSetType(type: ValueObjects.CustomViewType) {
    this.validateVisa();
    this.props.type = type.valueOf();
  }

  requestSetFilters(filters: ValueObjects.CustomViewFilters) {
    
}
