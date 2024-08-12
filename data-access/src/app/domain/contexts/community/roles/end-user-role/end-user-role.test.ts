import { EndUserRole, EndUserRoleProps } from './end-user-role';
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
    givenValidContext.domainVisa.forEndUserRole = jest.fn(() => jest.mocked({} as CommunityVisa));

    it('should reject an invalid role name', () => {
      // Arrange
      const givenInvalidRoleName = 'x'.repeat(51);
      const roleProps = jest.mocked({} as EndUserRoleProps);
      
      // Act
      const creatingInvalidEndUserRole = () => { 
        EndUserRole.getNewInstance(roleProps, givenInvalidRoleName, false, givenValidCommunity, givenValidContext); 
      };

      // Assert
      expect(creatingInvalidEndUserRole).toThrowError('Too long');
    });

    it('should accept valid input', () => {
      // Arrange
      const roleProps = jest.mocked({ setCommunityRef(community) {
        community
      }} as EndUserRoleProps);
      
      // Act
      const creatingValidEndUserRole = () => { 
        EndUserRole.getNewInstance(roleProps, givenValidRoleName, false, givenValidCommunity, givenValidContext); 
      };

      // Assert
      expect(creatingValidEndUserRole).not.toThrow();
    });

  });

  describe('when updating an end user role', () => {
    const roleProps = jest.mocked({} as EndUserRoleProps);
    const givenValidContext = jest.mocked({} as DomainExecutionContext);
    givenValidContext.domainVisa = jest.mocked({} as DomainVisa);

    it('should reject without proper permission', () => {
      // Arrange
      const roleProps = jest.mocked({ permissions: { communityPermissions: {} }, setCommunityRef(community) { community } } as EndUserRoleProps);
      givenValidContext.domainVisa.forEndUserRole = jest.fn(() => jest.mocked({ determineIf(func) {
        return func({canManageRolesAndPermissions: false});
      }} as CommunityVisa));
      const endUserRole = new EndUserRole(roleProps, givenValidContext);
      
      // Act
      const updatingEndUserRoleWithoutVisa = () => { 
        endUserRole.permissions.communityPermissions.CanManageMembers=(true);
      };

      // Assert
      expect(updatingEndUserRoleWithoutVisa).toThrow('Cannot set permission');
    })

    it('should reject an invalid role name', () => {
      // Arrange
      givenValidContext.domainVisa.forEndUserRole = jest.fn(() => jest.mocked({ determineIf(func) { 
        return func({canManageRolesAndPermissions: true}); 
      }} as CommunityVisa));
      const endUserRole = new EndUserRole(roleProps, givenValidContext);
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