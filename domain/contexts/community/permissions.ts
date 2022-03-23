import { Entity, EntityProps } from '../../shared/entity';
import { CommunityPermissions, CommunityPermissionsEntityReference, CommunityPermissionsProps } from './community-permissions';
import { CommunityVisa } from '../iam/community-visa';

export interface PermissionsProps extends EntityProps {
  communityPermissions: CommunityPermissionsProps;
}

export interface PermissionsEntityReference extends Readonly<Omit<PermissionsProps, 'communityPermissions'>> {
  readonly communityPermissions: CommunityPermissionsEntityReference;
}

export class Permissions extends Entity<PermissionsProps> implements PermissionsEntityReference {
  constructor(props: PermissionsProps,private visa:CommunityVisa) { 
    super(props); 
  }

  get communityPermissions(): CommunityPermissions {
    return new CommunityPermissions(this.props.communityPermissions,this.visa);
  }
}