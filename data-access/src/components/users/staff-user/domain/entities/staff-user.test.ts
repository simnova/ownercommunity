import { StaffUser, StaffUserProps } from './staff-user';
import { StaffUserCreatedEvent } from '../../../events/types/staff-user-created';
import { DomainExecutionContext } from '../../../../../../framework/domain/domain-execution-context';
import { DomainVisa } from '../../../domain.visa';
import { StaffUserVisa } from '../staff-user.visa';

describe('domain.contexts.staff-user', () => {
  describe('when creating a new staff user', () => {
    const givenValidExternalId = '9b5b121b-7726-460c-8ead-58378c9ab29e';
    const givenValidRestOfName = 'John';
    const givenValidLastName = 'Doe';
    const givenValidEmail = 'john.doe@email.com';
    const givenValidContext = jest.mocked({} as DomainExecutionContext);
    givenValidContext.domainVisa = jest.mocked({} as DomainVisa);
    givenValidContext.domainVisa.forStaffUser = jest.fn(() => jest.mocked({} as StaffUserVisa));

    it('should reject an invalid externalId', () => {
      // Arrange
      const givenInvalidExternalId = 'this-is-an-invalid-external-id';
      const userProps = jest.mocked({} as StaffUserProps);
      
      // Act
      const creatingInvalidUser = () => { 
        StaffUser.getNewUser(userProps,givenInvalidExternalId,givenValidRestOfName,givenValidLastName, givenValidEmail, givenValidContext); 
      };

      // Assert
      expect(creatingInvalidUser).toThrowError('Too short');
    });

    it('should reject an invalid restOfName', () => {
      // Arrange
      const userProps = jest.mocked({} as StaffUserProps);
      const givenInvalidRestOfName = 'U3edLYh3jCG6qVcJyp4VYbWVBHCD72tEWxveuKM52pp5VV77otbhztgp5HJrvRshhHxjxDTiWEsuskVBFKd2WosKOvBCvXHZMy0sE7iXzLA9q8m6vevUK0UUnUsImby5uuun3R1LbjsQucbLO9R1GLnvYBWBbvVbpT6Wycq4JDfJWfjamxLmCqxjlhFMyUDMm2XMvkKdBVfYVJ9zx13HInjGSliPOgY5Ab3gVTx0r7v6VJ5gOxfoe762uemL9u3LvNvQaR89UgopJEwIYe3UanhkqXshFxK9Ryk7C38KLRzrTqbsfLedIISlBlrGaIQlWw44ehMaFx1D7eupzO49NQn5gCMiZN3lVwK1P6Ipq2w8hLjDY17rjLYo9HIF1cTVXzIB01n7ecQfP5YB7nIAT8uFEV34RPRCS3OU6WSLuFkOeC1xb2ssMATDvRfBiuZr9yraH43jipwV3QE2g3q3FrTGvmhZrrjjjedmj0iqpRGGHZRN9z9jU';
      
      // Act
      const creatingInvalidUser = () => { 
        StaffUser.getNewUser(userProps,givenValidExternalId,givenInvalidRestOfName,givenValidLastName, givenValidEmail, givenValidContext); 
      };

      // Assert
      expect(creatingInvalidUser).toThrowError('Too long');
    });

    it('should reject an invalid lastName', () => {
      // Arrange
      const userProps = jest.mocked({} as StaffUserProps);
      const givenInvalidLastName = 'U3edLYh3jCG6qVcJyp4VYbWVBHCD72tEWxveuKM52pp5VV77otbhztgp5HJrvRshhHxjxDTiWEsuskVBFKd2WosKOvBCvXHZMy0sE7iXzLA9q8m6vevUK0UUnUsImby5uuun3R1LbjsQucbLO9R1GLnvYBWBbvVbpT6Wycq4JDfJWfjamxLmCqxjlhFMyUDMm2XMvkKdBVfYVJ9zx13HInjGSliPOgY5Ab3gVTx0r7v6VJ5gOxfoe762uemL9u3LvNvQaR89UgopJEwIYe3UanhkqXshFxK9Ryk7C38KLRzrTqbsfLedIISlBlrGaIQlWw44ehMaFx1D7eupzO49NQn5gCMiZN3lVwK1P6Ipq2w8hLjDY17rjLYo9HIF1cTVXzIB01n7ecQfP5YB7nIAT8uFEV34RPRCS3OU6WSLuFkOeC1xb2ssMATDvRfBiuZr9yraH43jipwV3QE2g3q3FrTGvmhZrrjjjedmj0iqpRGGHZRN9z9jU';
      
      // Act
      const creatingInvalidUser = () => { 
        StaffUser.getNewUser(userProps,givenValidExternalId,givenValidRestOfName,givenInvalidLastName, givenValidEmail, givenValidContext); 
      };

      // Assert
      expect(creatingInvalidUser).toThrowError('Too long');
    });

    it('should raise a StaffUserCreatedEvent', async () => {
      // Arrange
      const expectedNewId = '12345';
      const userProps = jest.mocked({id:expectedNewId} as StaffUserProps);
      
      // Act
      const user = StaffUser.getNewUser(userProps, givenValidExternalId, givenValidRestOfName, givenValidLastName, givenValidEmail, givenValidContext);
    
      // Assert
      const integrationEvent = user.getIntegrationEvents().find(e => e.aggregateId === expectedNewId && e instanceof StaffUserCreatedEvent) as StaffUserCreatedEvent;
      expect(integrationEvent.payload.externalId).toBe(givenValidExternalId);
    
    });

  });

  describe('when updating a staff user', () => {
    it('should reject an invalid email', () => {
      // Arrange
      const userProps = jest.mocked({} as StaffUserProps);
      const givenValidContext = jest.mocked({} as DomainExecutionContext);
      givenValidContext.domainVisa = jest.mocked({} as DomainVisa);
      givenValidContext.domainVisa.forStaffUser = jest.fn(() => jest.mocked({ determineIf(func) {
        return func({isEditingOwnAccount: true});
      },} as StaffUserVisa));
      
      const user = new StaffUser(userProps, givenValidContext);
      const givenInvalidEmail = 'bad-email';
      
      // Act
      const updatingUserWithInvalidProperty = () => { 
        user.Email=(givenInvalidEmail);
      };

      // Assert
      expect(updatingUserWithInvalidProperty).toThrowError('Value doesn\'t match pattern');
    });

  });

});