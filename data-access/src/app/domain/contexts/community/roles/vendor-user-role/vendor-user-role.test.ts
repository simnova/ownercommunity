import { VendorUserRole, VendorUserRoleProps } from './vendor-user-role';
import { DomainExecutionContext } from '../../../../domain-execution-context';
import { DomainVisa } from '../../../../domain.visa';
import { CommunityVisa } from '../../community.visa';
import { CommunityEntityReference } from '../../community/community';

describe('domain.contexts.end-user-role', () => {
  describe('when creating a new end user role', () => {
    const givenValidCommunity = jest.mocked({} as CommunityEntityReference);
    const givenValidRoleName = 'admin';
    const givenValidContext = jest.mocked({} as DomainExecutionContext);
    givenValidContext.domainVisa = jest.mocked({} as DomainVisa);
    givenValidContext.domainVisa.forVendorUserRole = jest.fn(() => jest.mocked({} as CommunityVisa));

    it('should reject an invalid role name', () => {
      // Arrange
      const givenInvalidRoleName = 'x'.repeat(51);
      const roleProps = jest.mocked({} as VendorUserRoleProps);
      
      // Act
      const creatingInvalidVendorUserRole = () => { 
        VendorUserRole.getNewInstance(roleProps, givenInvalidRoleName, false, givenValidCommunity, givenValidContext); 
      };

      // Assert
      expect(creatingInvalidVendorUserRole).toThrowError('Too long');
    });

    it('should accept valid input', () => {
      // Arrange
      const roleProps = jest.mocked({ setCommunityRef(community) {
        community
      }} as VendorUserRoleProps);
      
      // Act
      const creatingValidVendorUserRole = () => { 
        VendorUserRole.getNewInstance(roleProps, givenValidRoleName, false, givenValidCommunity, givenValidContext); 
      };

      // Assert
      expect(creatingValidVendorUserRole).not.toThrow();
    });

  });

  describe('when updating an end user role', () => {
    const roleProps = jest.mocked({} as VendorUserRoleProps);
    const givenValidContext = jest.mocked({} as DomainExecutionContext);
    givenValidContext.domainVisa = jest.mocked({} as DomainVisa);

    it('should reject without proper permission', () => {
      // Arrange
      const roleProps = jest.mocked({ permissions: { communityPermissions: {} }, setCommunityRef(community) { community } } as VendorUserRoleProps);
      givenValidContext.domainVisa.forVendorUserRole = jest.fn(() => jest.mocked({ determineIf(func) {
        return func({canManageRolesAndPermissions: false});
      }} as CommunityVisa));
      const endUserRole = new VendorUserRole(roleProps, givenValidContext);
      
      // Act
      const updatingVendorUserRoleWithoutVisa = () => { 
        endUserRole.permissions.communityPermissions.CanManageMembers=(true);
      };

      // Assert
      expect(updatingVendorUserRoleWithoutVisa).toThrow('Cannot set permission');
    })

    it('should reject an invalid role name', () => {
      // Arrange
      givenValidContext.domainVisa.forVendorUserRole = jest.fn(() => jest.mocked({ determineIf(func) { 
        return func({canManageRolesAndPermissions: true}); 
      }} as CommunityVisa));
      const endUserRole = new VendorUserRole(roleProps, givenValidContext);
      const givenInvalidRoleName = '';
      
      // Act
      const updatingUserWithInvalidProperty = () => { 
        endUserRole.RoleName=(givenInvalidRoleName);
      };

      // Assert
      expect(updatingUserWithInvalidProperty).toThrowError('Too short');
    });

  });

});