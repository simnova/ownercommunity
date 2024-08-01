import { Entity, EntityProps } from '../../../../../../../seedwork/domain-seedwork/entity';
import { EndUserRoleCommunityPermissions, EndUserRoleCommunityPermissionsEntityReference, EndUserRoleCommunityPermissionsProps } from './community-permissions';
import { CommunityVisa } from "../../community.visa";
import { EndUserRolePropertyPermissions, EndUserRolePropertyPermissionsProps } from './property-permissions';
import { EndUserRoleServiceTicketPermissions, EndUserRoleServiceTicketPermissionsProps } from './service-ticket-permissions';
import { EndUserRoleServicePermissions, EndUserRoleServicePermissionsProps } from './service-permissions';
import { EndUserRoleViolationTicketPermissions, EndUserRoleViolationTicketPermissionsProps } from './violation-ticket-permissions';

export interface EndUserRolePermissionsProps extends EntityProps {
  communityPermissions: EndUserRoleCommunityPermissionsProps;
  propertyPermissions: EndUserRolePropertyPermissionsProps;
  serviceTicketPermissions: EndUserRoleServiceTicketPermissionsProps;
  servicePermissions: EndUserRoleServicePermissionsProps;
  violationTicketPermissions: EndUserRoleViolationTicketPermissionsProps;
}

export interface EndUserRolePermissionsEntityReference extends Readonly<Omit<EndUserRolePermissionsProps, 'communityPermissions'>> {
  readonly communityPermissions: EndUserRoleCommunityPermissionsEntityReference;
}

export class EndUserRolePermissions extends Entity<EndUserRolePermissionsProps> implements EndUserRolePermissionsEntityReference {
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