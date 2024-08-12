import { StaffRole, StaffRoleProps } from './staff-role';
import { DomainExecutionContext } from '../../../../domain-execution-context';
import { DomainVisa } from '../../../../domain.visa';
import { CommunityVisa } from '../../community.visa';
import { CommunityEntityReference } from '../../community/community';

describe('domain.contexts.staff-role', () => {
  describe('when creating a new staff role', () => {
    const givenValidRoleName = 'admin';
    const givenValidContext = jest.mocked({} as DomainExecutionContext);
    givenValidContext.domainVisa = jest.mocked({} as DomainVisa);
    givenValidContext.domainVisa.forStaffRole = jest.fn(() => jest.mocked({} as CommunityVisa));

    it('should reject an invalid role name', () => {
      // Arrange
      const givenInvalidRoleName = 'x'.repeat(51);
      const roleProps = jest.mocked({} as StaffRoleProps);
      
      // Act
      const creatingInvalidStaffRole = () => { 
        StaffRole.getNewInstance(roleProps, givenInvalidRoleName, false, givenValidContext); 
      };

      // Assert
      expect(creatingInvalidStaffRole).toThrowError('Too long');
    });

    it('should accept valid input', () => {
      // Arrange
      const roleProps = jest.mocked({} as StaffRoleProps);
      
      // Act
      const creatingValidStaffRole = () => { 
        StaffRole.getNewInstance(roleProps, givenValidRoleName, false, givenValidContext); 
      };

      // Assert
      expect(creatingValidStaffRole).not.toThrow();
    });

  });

  describe('when updating an staff role', () => {
    const roleProps = jest.mocked({} as StaffRoleProps);
    const givenValidContext = jest.mocked({} as DomainExecutionContext);
    givenValidContext.domainVisa = jest.mocked({} as DomainVisa);

    it('should reject without proper permission', () => {
      // Arrange
      const roleProps = jest.mocked({ permissions: { communityPermissions: {} } } as StaffRoleProps);
      givenValidContext.domainVisa.forStaffRole = jest.fn(() => jest.mocked({ determineIf(func) {
        return func({canManageStaffRolesAndPermissions: false});
      }} as CommunityVisa));
      const role = new StaffRole(roleProps, givenValidContext);
      
      // Act
      const updatingStaffRoleWithoutVisa = () => { 
        role.permissions.communityPermissions.CanManageAllCommunities=(true);
      };

      // Assert
      expect(updatingStaffRoleWithoutVisa).toThrow('Cannot set permission');
    })

    it('should reject an invalid role name', () => {
      // Arrange
      givenValidContext.domainVisa.forStaffRole = jest.fn(() => jest.mocked({ determineIf(func) { 
        return func({canManageStaffRolesAndPermissions: true}); 
      }} as CommunityVisa));
      const role = new StaffRole(roleProps, givenValidContext);
      const givenInvalidRoleName = '';
      
      // Act
      const updatingUserWithInvalidProperty = () => { 
        role.RoleName=(givenInvalidRoleName);
      };

      // Assert
      expect(updatingUserWithInvalidProperty).toThrowError('Too short');
    });

  });

});