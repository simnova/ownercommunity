import { Community, CommunityProps } from './community';
import { UserEntityReference } from '../user/user';
import { DomainExecutionContext } from '../domain-execution-context';
import { CommunityVisa } from '../iam/community-visa';
import { Passport } from '../iam/passport';
import { CommunityCreatedEvent } from '../../events/types/community-created';

describe('domain.contexts.community::community', () => {
  describe('when creating a new community', () => {
    const givenValidCommunityName = 'valid-community-name';
    const givenValidCreatedBy = jest.mocked({} as UserEntityReference);
    const givenValidContext = jest.mocked({} as DomainExecutionContext);
    
    it('should reject an invalid Name', () => {
      // Arrange
      const newProps = jest.mocked({} as CommunityProps);
      newProps.setCreatedByRef = jest.fn();
      givenValidContext.passport = jest.mocked({} as Passport);
      givenValidContext.passport.forCommunity = jest.fn(() => jest.mocked({} as CommunityVisa));

      //201 characters ->  http://www.unit-conversion.info/texttools/random-string-generator/
      const givenInvalidCommunityName = 'REcK03mhSslLPAmidGzyRvc16iOyrZ9VDfgnOcTlBEZzDFlbl8FdPcpLGZXLAXJxbScF96qRhGkqnPgDWMYAHst56OZwIxVb4b8mX4FvmiqwjpY51pBG5C9EOwlWhELc7mi74z977jnaR4IpMlP3cZpUY0bkRLJAUVprG2jfHQymztv4KbQzDUcmbwjnXiBIxO9faxcV0';  

      // Act
      const creatingInvalidCommunity = () => { 
        Community.getNewInstance(newProps, givenInvalidCommunityName,givenValidCreatedBy,givenValidContext);
      };

      // Assert
      expect(creatingInvalidCommunity).toThrowError('Too long');
    });

    it('should reject an invalid CreatedBy', () => {
      // Arrange
      const newProps = jest.mocked({} as CommunityProps);
      newProps.setCreatedByRef = jest.fn();
      givenValidContext.passport = jest.mocked({} as Passport);
      givenValidContext.passport.forCommunity = jest.fn(() => jest.mocked({} as CommunityVisa));

      const givenInvalidCreatedBy = null;
      // Act
      const creatingInvalidCommunity = () => { 
        Community.getNewInstance(newProps, givenValidCommunityName,givenInvalidCreatedBy,givenValidContext);
      };

      // Assert
      expect(creatingInvalidCommunity).toThrowError('createdBy cannot be null or undefined');
    });

    it('should raise a CommunityCreatedEvent', async () => {
      // Arrange
      const expectedNewId = '12345';
      const newProps = jest.mocked({id:expectedNewId} as CommunityProps);
      newProps.setCreatedByRef = jest.fn();
      
      // Act
      const community = Community.getNewInstance(newProps, givenValidCommunityName,givenValidCreatedBy,givenValidContext);
    
      // Assert
      const integrationEvent = community.getIntegrationEvents().find(e => e.aggregateId === expectedNewId && e instanceof CommunityCreatedEvent) as CommunityCreatedEvent;
      expect(integrationEvent.payload.communityId).toBe(expectedNewId);
    
    });

  });

}); 