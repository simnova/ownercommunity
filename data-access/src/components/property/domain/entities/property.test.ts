import { Property, PropertyProps } from './property';
import { EndUserEntityReference } from '../../users/end-user/end-user';
import { DomainExecutionContext } from '../../../../../../framework/domain/domain-execution-context';
import { PropertyVisa } from "../property.domain-visa";
import { DomainVisa } from '../../../domain.visa';
import { PropertyCreatedEvent } from '../../../events/types/property-created';
import { CommunityEntityReference } from '../../community/community/community';

describe('domain.contexts.property::property', () => {
  describe('when creating a new property', () => {
    const givenValidPropertyName = 'valid-property-name';
    const givenValidCommunity = jest.mocked({} as CommunityEntityReference);
    const givenValidCreatedBy = jest.mocked({} as EndUserEntityReference);
    const givenValidContext = jest.mocked({} as DomainExecutionContext);
    
    it('should reject an invalid name', () => {
      // Arrange
      const newProps = jest.mocked({} as PropertyProps);
      givenValidContext.domainVisa = jest.mocked({} as DomainVisa);
      givenValidContext.domainVisa.forProperty = jest.fn(() => jest.mocked({} as PropertyVisa));

      //201 characters ->  http://www.unit-conversion.info/texttools/random-string-generator/
      const givenInvalidPropertyName = 'x'.repeat(101);

      // Act
      const creatingInvalidProperty = () => { 
        Property.getNewInstance(newProps, givenInvalidPropertyName,givenValidCommunity,givenValidContext);
      };

      // Assert
      expect(creatingInvalidProperty).toThrowError('Too long');
    });

    it('should raise a PropertyCreatedEvent', async () => {
      // Arrange
      const expectedNewId = '12345';
      const newProps = jest.mocked({id:expectedNewId} as PropertyProps);
      newProps.setCommunityRef = jest.fn();
      
      // Act
      const property = Property.getNewInstance(newProps, givenValidPropertyName, givenValidCommunity,givenValidContext);
    
      // Assert
      const integrationEvent = property.getIntegrationEvents().find(e => e.aggregateId === expectedNewId && e instanceof PropertyCreatedEvent) as PropertyCreatedEvent;
      expect(integrationEvent.payload.id).toBe(expectedNewId);
    
    });

  });

  describe('when updating a property', () => {
    it('should reject members not editing their own property', () => {
      // Arrange
      const roleProps = jest.mocked({} as PropertyProps);
      const givenValidContext = jest.mocked({} as DomainExecutionContext);
      givenValidContext.domainVisa = jest.mocked({} as DomainVisa);
      givenValidContext.domainVisa.forProperty = jest.fn(() => jest.mocked({ determineIf(func) {
        return func({canManageProperties: false, isEditingOwnProperty: false, canEditOwnProperty: true});
      }} as PropertyVisa));
      const property = new Property(roleProps, givenValidContext);
      
      // Act
      const updatingPropertyWithoutMemberPermissions = () => { 
        property.ListedForSale = true;
      };
      
      // Assert
      expect(updatingPropertyWithoutMemberPermissions).toThrowError('Unauthorized');
    });

    it('should allow admins to update properties that are not their own', () => {
      // Arrange
      const roleProps = jest.mocked({} as PropertyProps);
      const givenValidContext = jest.mocked({} as DomainExecutionContext);
      givenValidContext.domainVisa = jest.mocked({} as DomainVisa);
      givenValidContext.domainVisa.forProperty = jest.fn(() => jest.mocked({ determineIf(func) {
        return func({canManageProperties: true, isEditingOwnProperty: false, canEditOwnProperty: true});
      }} as PropertyVisa));
      const property = new Property(roleProps, givenValidContext);
      
      // Act
      const updatingPropertyWithAdminPermissions = () => { 
        property.ListedForSale = true;
      };
      
      // Assert
      expect(updatingPropertyWithAdminPermissions).not.toThrow();
    });

    it('should allow members to update their own properties', () => {
      // Arrange
      const roleProps = jest.mocked({} as PropertyProps);
      const givenValidContext = jest.mocked({} as DomainExecutionContext);
      givenValidContext.domainVisa = jest.mocked({} as DomainVisa);
      givenValidContext.domainVisa.forProperty = jest.fn(() => jest.mocked({ determineIf(func) {
        return func({canManageProperties: false, isEditingOwnProperty: true, canEditOwnProperty: true});
      }} as PropertyVisa));
      const property = new Property(roleProps, givenValidContext);
      
      // Act
      const updatingPropertyWithMemberPermissions = () => { 
        property.ListedForSale = true;
      };
      
      // Assert
      expect(updatingPropertyWithMemberPermissions).not.toThrow();
    });

    it('should reject undefined price', () => {
      // Arrange
      const roleProps = jest.mocked({} as PropertyProps);
      const givenValidContext = jest.mocked({} as DomainExecutionContext);
      givenValidContext.domainVisa = jest.mocked({} as DomainVisa);
      givenValidContext.domainVisa.forProperty = jest.fn(() => jest.mocked({ determineIf(func) {
        return func({canManageProperties: false, isEditingOwnProperty: true, canEditOwnProperty: true});
      }} as PropertyVisa));
      const property = new Property(roleProps, givenValidContext);
      
      // Act
      const updatingPropertyWithUndefinedPrice = () => { 
        property.listingDetail.Price = undefined;
      };
      
      // Assert
      expect(updatingPropertyWithUndefinedPrice).toThrowError('Wrong raw value type');
    })

    it('should accept null price', () => {
      // Arrange
      const roleProps = jest.mocked({ listingDetail: {} } as PropertyProps);
      const givenValidContext = jest.mocked({} as DomainExecutionContext);
      givenValidContext.domainVisa = jest.mocked({} as DomainVisa);
      givenValidContext.domainVisa.forProperty = jest.fn(() => jest.mocked({ determineIf(func) {
        return func({canManageProperties: false, isEditingOwnProperty: true, canEditOwnProperty: true});
      }} as PropertyVisa));
      const property = new Property(roleProps, givenValidContext);
      
      // Act
      const updatingPropertyWithNullPrice = () => { 
        property.listingDetail.Price = null;
      };
      
      // Assert
      expect(updatingPropertyWithNullPrice).not.toThrow();
    });

    it('should reject a negative price', () => {
      // Arrange
      const roleProps = jest.mocked({ listingDetail: {} } as PropertyProps);
      const givenValidContext = jest.mocked({} as DomainExecutionContext);
      givenValidContext.domainVisa = jest.mocked({} as DomainVisa);
      givenValidContext.domainVisa.forProperty = jest.fn(() => jest.mocked({ determineIf(func) {
        return func({canManageProperties: false, isEditingOwnProperty: true, canEditOwnProperty: true});
      }} as PropertyVisa));
      const property = new Property(roleProps, givenValidContext);
      
      // Act
      const updatingPropertyWithNegativePrice = () => { 
        property.listingDetail.Price = -1000;
      };
      
      // Assert
      expect(updatingPropertyWithNegativePrice).toThrowError('Too small');
    });

    it('should accept a valid price', () => {
      // Arrange
      const roleProps = jest.mocked({ listingDetail: {} } as PropertyProps);
      const givenValidContext = jest.mocked({} as DomainExecutionContext);
      givenValidContext.domainVisa = jest.mocked({} as DomainVisa);
      givenValidContext.domainVisa.forProperty = jest.fn(() => jest.mocked({ determineIf(func) {
        return func({canManageProperties: false, isEditingOwnProperty: true, canEditOwnProperty: true});
      }} as PropertyVisa));
      const property = new Property(roleProps, givenValidContext);
      
      // Act
      const updatingPropertyWithoutVisa = () => { 
        property.listingDetail.Price = 1000;
      };
      
      // Assert
      expect(updatingPropertyWithoutVisa).not.toThrow();
    })

  });

}); 