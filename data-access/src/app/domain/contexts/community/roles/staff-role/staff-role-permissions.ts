import { Entity, EntityProps } from '../../../../../../../seedwork/domain-seedwork/entity';
import { StaffRoleCommunityPermissions, StaffRoleCommunityPermissionsEntityReference, StaffRoleCommunityPermissionsProps } from './community-permissions';
import { CommunityVisa } from "../../community.visa";
import { StaffRolePropertyPermissions, StaffRolePropertyPermissionsProps } from './property-permissions';
import { StaffRoleServiceTicketPermissions, StaffRoleServiceTicketPermissionsProps } from './service-ticket-permissions';
import { StaffRoleServicePermissions, StaffRoleServicePermissionsProps } from './service-permissions';
import { StaffRoleViolationTicketPermissions, StaffRoleViolationTicketPermissionsProps } from './violation-ticket-permissions';

export interface StaffRolePermissionsProps extends EntityProps {
  communityPermissions: StaffRoleCommunityPermissionsProps;
  propertyPermissions: StaffRolePropertyPermissionsProps;
  serviceTicketPermissions: StaffRoleServiceTicketPermissionsProps;
  servicePermissions: StaffRoleServicePermissionsProps;
  violationTicketPermissions: StaffRoleViolationTicketPermissionsProps;
}

export interface StaffRolePermissionsEntityReference extends Readonly<Omit<StaffRolePermissionsProps, 'communityPermissions'>> {
  readonly communityPermissions: StaffRoleCommunityPermissionsEntityReference;
}

export class StaffRolePermissions extends Entity<StaffRolePermissionsProps> implements StaffRolePermissionsEntityReference {
  constructor(props: StaffRolePermissionsProps,private visa:CommunityVisa) { 
    super(props); 
  }

  get communityPermissions(): StaffRoleCommunityPermissions {
    return new StaffRoleCommunityPermissions(this.props.communityPermissions,this.visa);
  }
  get propertyPermissions(): StaffRolePropertyPermissions {
    return new StaffRolePropertyPermissions(this.props.propertyPermissions,this.visa);
  }
  get serviceTicketPermissions(): StaffRoleServiceTicketPermissions {
    return new StaffRoleServiceTicketPermissions(this.props.serviceTicketPermissions,this.visa);
  }
  get servicePermissions(): StaffRoleServicePermissions {
    return new StaffRoleServicePermissions(this.props.servicePermissions,this.visa);
  }
  get violationTicketPermissions(): StaffRoleViolationTicketPermissions {
    return new StaffRoleViolationTicketPermissions(this.props.violationTicketPermissions,this.visa);
  }
}