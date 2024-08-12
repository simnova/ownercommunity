import { EndUserRoleCommunityPermissions, EndUserRoleCommunityPermissionsEntityReference, EndUserRoleCommunityPermissionsProps } from './community-permissions';
import { CommunityVisa } from "../../community.visa";
import { EndUserRolePropertyPermissions, EndUserRolePropertyPermissionsEntityReference, EndUserRolePropertyPermissionsProps } from './property-permissions';
import { EndUserRoleServiceTicketPermissions, EndUserRoleServiceTicketPermissionsEntityReference, EndUserRoleServiceTicketPermissionsProps } from './service-ticket-permissions';
import { EndUserRoleServicePermissions, EndUserRoleServicePermissionsEntityReference, EndUserRoleServicePermissionsProps } from './service-permissions';
import { EndUserRoleViolationTicketPermissions, EndUserRoleViolationTicketPermissionsEntityReference, EndUserRoleViolationTicketPermissionsProps } from './violation-ticket-permissions';
import { ValueObject, ValueObjectProps } from '../../../../../../../seedwork/domain-seedwork/value-object';

export interface EndUserRolePermissionsProps extends ValueObjectProps {
  readonly communityPermissions: EndUserRoleCommunityPermissionsProps;
  readonly propertyPermissions: EndUserRolePropertyPermissionsProps;
  readonly serviceTicketPermissions: EndUserRoleServiceTicketPermissionsProps;
  readonly servicePermissions: EndUserRoleServicePermissionsProps;
  readonly violationTicketPermissions: EndUserRoleViolationTicketPermissionsProps;
}

export interface EndUserRolePermissionsEntityReference extends Readonly<Omit<EndUserRolePermissionsProps, 
  'communityPermissions' | 'propertyPermissions' | 'serviceTicketPermissions' | 'servicePermissions' | 'violationTicketPermissions' >> {
  readonly communityPermissions: EndUserRoleCommunityPermissionsEntityReference;
  readonly propertyPermissions: EndUserRolePropertyPermissionsEntityReference;
  readonly serviceTicketPermissions: EndUserRoleServiceTicketPermissionsEntityReference;
  readonly servicePermissions: EndUserRoleServicePermissionsEntityReference;
  readonly violationTicketPermissions: EndUserRoleViolationTicketPermissionsEntityReference;
}

export class EndUserRolePermissions extends ValueObject<EndUserRolePermissionsProps> implements EndUserRolePermissionsEntityReference {
  constructor(props: EndUserRolePermissionsProps,private visa:CommunityVisa) { 
    super(props); 
  }

  get communityPermissions(): EndUserRoleCommunityPermissions {
    return new EndUserRoleCommunityPermissions(this.props.communityPermissions,this.visa);
  }
  get propertyPermissions(): EndUserRolePropertyPermissions {
    return new EndUserRolePropertyPermissions(this.props.propertyPermissions,this.visa);
  }
  get serviceTicketPermissions(): EndUserRoleServiceTicketPermissions {
    return new EndUserRoleServiceTicketPermissions(this.props.serviceTicketPermissions,this.visa);
  }
  get servicePermissions(): EndUserRoleServicePermissions {
    return new EndUserRoleServicePermissions(this.props.servicePermissions,this.visa);
  }
  get violationTicketPermissions(): EndUserRoleViolationTicketPermissions {
    return new EndUserRoleViolationTicketPermissions(this.props.violationTicketPermissions,this.visa);
  }
}