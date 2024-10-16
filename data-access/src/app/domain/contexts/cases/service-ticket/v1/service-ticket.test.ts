import { ServiceTicketV1, ServiceTicketV1Props } from './service-ticket-v1';
import { ActivityDetailProps } from './activity-detail';
import { PropArray } from '../../../../../../../seedwork/domain-seedwork/prop-array';
import { CommunityEntityReference } from '../../../community/community/community';
import { PropertyEntityReference } from '../../../property/property/property';
import { MemberEntityReference } from '../../../community/member/member';
import { DomainExecutionContext } from '../../../../domain-execution-context';
import { ServiceTicketV1Visa } from './service-ticket.visa';
import { DomainVisa } from '../../../../domain.visa';

describe('domain.contexts.service-ticket::service-ticket', () => {
  describe('when creating a new service ticket', () => {
    const givenValidTitle = 'valid-title';
    const givenValidDescription = 'valid-description';
    const givenValidCommunity = jest.mocked({} as CommunityEntityReference);
    const givenValidProperty = jest.mocked({} as PropertyEntityReference);
    const givenValidRequestor = jest.mocked({} as MemberEntityReference);
    const serviceTicketVisaMock = jest.mocked({} as ServiceTicketV1Visa);
    const givenValidContext = jest.mocked<DomainExecutionContext>(
      ({
        domainVisa: jest.mocked<DomainVisa>(
          ({
            forServiceTicketV1: jest.fn(() => serviceTicketVisaMock)
          } as Partial<DomainVisa>) as any)
      } as Partial<DomainExecutionContext>) as any
    );
    const serviceTicketV1Props = jest.mocked<ServiceTicketV1Props>(
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
        ServiceTicketV1.getNewInstance(
          serviceTicketV1Props,
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
        ServiceTicketV1.getNewInstance(
          serviceTicketV1Props,
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
        ServiceTicketV1.getNewInstance(
          serviceTicketV1Props,
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
        ServiceTicketV1.getNewInstance(
          serviceTicketV1Props,
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