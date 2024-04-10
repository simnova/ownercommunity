import { ServiceTicket, ServiceTicketProps } from './service-ticket';
import { ActivityDetailProps } from './activity-detail';
import { PropArray } from '../../../../../seedwork/domain-seedwork/prop-array';
import { CommunityEntityReference } from '../community/community';
import { PropertyEntityReference } from '../property/property';
import { MemberEntityReference } from '../community/member';
import { DomainExecutionContext } from '../domain-execution-context';
import { ServiceTicketVisa } from '../iam/service-ticket-visa';
import { Passport } from '../iam/passport';

describe('domain.contexts.service-ticket::service-ticket', () => {
  describe('when creating a new service ticket', () => {
    const givenValidTitle = 'valid-title';
    const givenValidDescription = 'valid-description';
    const givenValidCommunity = jest.mocked({} as CommunityEntityReference);
    const givenValidProperty = jest.mocked({} as PropertyEntityReference);
    const givenValidRequestor = jest.mocked({} as MemberEntityReference);
    const serviceTicketVisaMock = jest.mocked({} as ServiceTicketVisa);
    const givenValidContext = jest.mocked<DomainExecutionContext>(
      ({
        passport: jest.mocked<Passport>(
          ({
            forServiceTicket: jest.fn(() => serviceTicketVisaMock)
          } as Partial<Passport>) as any)
      } as Partial<DomainExecutionContext>) as any
    );
    const serviceTicketProps = jest.mocked<ServiceTicketProps>(
      ({
        activityLog : jest.mocked<PropArray<ActivityDetailProps>>(({
          getNewItem : jest.fn(() => jest.mocked<ActivityDetailProps>({setActivityByRef : jest.fn()} as any)),
        } as Partial<PropArray<ActivityDetailProps>> ) as any),
        setCommunityRef : jest.fn(),
        setPropertyRef : jest.fn(),
        setRequestorRef : jest.fn(),
      } as Partial<ActivityDetailProps>) as any);

    it('should reject an long title', () => {
      // Arrange
      //201 characters ->  http://www.unit-conversion.info/texttools/random-string-generator/
      const givenInvalidTitle = 'x'.repeat(201);  
      
      // Act
      const creatingInvalidServiceTicket = () => { 
        ServiceTicket.getNewInstance(
          serviceTicketProps,
          givenInvalidTitle,
          givenValidDescription,
          givenValidCommunity,
          givenValidProperty,
          givenValidRequestor,
          givenValidContext
          ) 
      };

      // Assert
      expect(creatingInvalidServiceTicket).toThrowError('Too long');
    });

    it('should reject an empty title', () => {
      // Arrange
      const givenInvalidTitle = 'x'.repeat(4);  
      
      // Act
      const creatingInvalidServiceTicket = () => { 
        ServiceTicket.getNewInstance(
          serviceTicketProps,
          givenInvalidTitle,
          givenValidDescription,
          givenValidCommunity,
          givenValidProperty,
          givenValidRequestor,
          givenValidContext
          ) 
      };

      // Assert
      expect(creatingInvalidServiceTicket).toThrowError('Too short');
    });

    it('should reject an invalid description', () => {
      // Arrange
      const givenInvalidDescription = 'x'.repeat(2001)
      
      // Act
      const creatingInvalidServiceTicket = () => { 
        ServiceTicket.getNewInstance(
          serviceTicketProps,
          givenValidTitle,
          givenInvalidDescription,
          givenValidCommunity,
          givenValidProperty,
          givenValidRequestor,
          givenValidContext
          ) 
      };

      // Assert
      expect(creatingInvalidServiceTicket).toThrowError('Too long');
    });

    it('should reject an invalid externalId', () => {
      // Arrange
      const givenInvalidRequestor = null;
      
      // Act
      const creatingInvalidServiceTicket = () => { 
        ServiceTicket.getNewInstance(
          serviceTicketProps,
          givenValidTitle,
          givenValidDescription,
          givenValidCommunity,
          givenValidProperty,
          givenInvalidRequestor,
          givenValidContext
          ) 
      };

      // Assert
      expect(creatingInvalidServiceTicket).toThrowError('requestor cannot be null or undefined');
    });

  });
});