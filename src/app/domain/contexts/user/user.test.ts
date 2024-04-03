import { User, UserProps } from './user';
import { UserCreatedEvent } from '../../events/types/user-created';

describe('domain.contexts.user', () => {
  describe('when creating a new user', () => {
    const givenValidExternalId = '9b5b121b-7726-460c-8ead-58378c9ab29e';
    const givenValidFirstName = 'John';
    const givenValidLastName = 'Doe';

    it('should reject an invalid externalId', () => {
      // Arrange
      const userProps = jest.mocked({} as UserProps);
      const givenInvalidExternalId = 'this-is-an-invalid-external-id';
      
      // Act
      const creatingInvalidUser = () => { 
        User.getNewUser(userProps,givenInvalidExternalId,givenValidFirstName,givenValidLastName) 
      };

      // Assert
      expect(creatingInvalidUser).toThrowError('Too short');
    });

    it('should reject an invalid firstName', () => {
      // Arrange
      const userProps = jest.mocked({} as UserProps);
      const givenInvalidFirstName = 'U3edLYh3jCG6qVcJyp4VYbWVBHCD72tEWxveuKM52pp5VV77otbhztgp5HJrvRshhHxjxDTiWEsuskVBFKd2WosKOvBCvXHZMy0sE7iXzLA9q8m6vevUK0UUnUsImby5uuun3R1LbjsQucbLO9R1GLnvYBWBbvVbpT6Wycq4JDfJWfjamxLmCqxjlhFMyUDMm2XMvkKdBVfYVJ9zx13HInjGSliPOgY5Ab3gVTx0r7v6VJ5gOxfoe762uemL9u3LvNvQaR89UgopJEwIYe3UanhkqXshFxK9Ryk7C38KLRzrTqbsfLedIISlBlrGaIQlWw44ehMaFx1D7eupzO49NQn5gCMiZN3lVwK1P6Ipq2w8hLjDY17rjLYo9HIF1cTVXzIB01n7ecQfP5YB7nIAT8uFEV34RPRCS3OU6WSLuFkOeC1xb2ssMATDvRfBiuZr9yraH43jipwV3QE2g3q3FrTGvmhZrrjjjedmj0iqpRGGHZRN9z9jU';
      
      // Act
      const creatingInvalidUser = () => { 
        User.getNewUser(userProps,givenValidExternalId,givenInvalidFirstName,givenValidLastName) 
      };

      // Assert
      expect(creatingInvalidUser).toThrowError('Too long');
    });

    it('should reject an invalid lastName', () => {
      // Arrange
      const userProps = jest.mocked({} as UserProps);
      const givenInvalidLastName = 'U3edLYh3jCG6qVcJyp4VYbWVBHCD72tEWxveuKM52pp5VV77otbhztgp5HJrvRshhHxjxDTiWEsuskVBFKd2WosKOvBCvXHZMy0sE7iXzLA9q8m6vevUK0UUnUsImby5uuun3R1LbjsQucbLO9R1GLnvYBWBbvVbpT6Wycq4JDfJWfjamxLmCqxjlhFMyUDMm2XMvkKdBVfYVJ9zx13HInjGSliPOgY5Ab3gVTx0r7v6VJ5gOxfoe762uemL9u3LvNvQaR89UgopJEwIYe3UanhkqXshFxK9Ryk7C38KLRzrTqbsfLedIISlBlrGaIQlWw44ehMaFx1D7eupzO49NQn5gCMiZN3lVwK1P6Ipq2w8hLjDY17rjLYo9HIF1cTVXzIB01n7ecQfP5YB7nIAT8uFEV34RPRCS3OU6WSLuFkOeC1xb2ssMATDvRfBiuZr9yraH43jipwV3QE2g3q3FrTGvmhZrrjjjedmj0iqpRGGHZRN9z9jU';
      
      // Act
      const creatingInvalidUser = () => { 
        User.getNewUser(userProps,givenValidExternalId,givenValidFirstName,givenInvalidLastName) 
      };

      // Assert
      expect(creatingInvalidUser).toThrowError('Too long');
    });

    it('should raise a UserCreatedEvent', async () => {
      // Arrange
      const expectedNewId = '12345';
      const userProps = jest.mocked({id:expectedNewId} as UserProps);
      
      // Act
      const user = User.getNewUser(userProps, givenValidExternalId, givenValidFirstName, givenValidLastName);
    
      // Assert
      const integrationEvent = user.getIntegrationEvents().find(e => e.aggregateId === expectedNewId && e instanceof UserCreatedEvent) as UserCreatedEvent;
      expect(integrationEvent.payload.userId).toBe(expectedNewId);
    
    });

  });

  describe('when updating a user', () => {
    it('should reject an invalid email', () => {
      // Arrange
      const userProps = jest.mocked({} as UserProps);
      const user = new User(userProps);
      const givenInvalidEmail = 'bad-email';
      
      // Act
      const updatingUserWithInvalidProperty = () => { 
        user.setEmail(givenInvalidEmail);
      };

      // Assert
      expect(updatingUserWithInvalidProperty).toThrowError('Value doesn\'t match pattern');
    });

  });

});