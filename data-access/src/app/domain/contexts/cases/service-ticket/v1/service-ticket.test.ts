import { PropArray } from '../../../../../../../seedwork/domain-seedwork/prop-array';
import { CommunityEntityReference } from '../../../community/community';
import { MemberEntityReference } from '../../../community/member';
import { DomainExecutionContext } from '../../../domain-execution-context';
import { DomainVisa } from '../../../iam/domain-visa';
import { ServiceTicketVisa } from '../../../iam/domain-visa/service-ticket-visa';
import { PropertyEntityReference } from '../../../property/property';
import { ServiceTicketV1, ServiceTicketV1Props } from './service-ticket';
import { ServiceTicketV1ActivityDetailProps } from './service-ticket-activity-detail';


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
        domainVisa: jest.mocked<DomainVisa>(
          ({
            forServiceTicket: jest.fn(() => serviceTicketVisaMock)
          } as Partial<DomainVisa>) as any)
      } as Partial<DomainExecutionContext>) as any
    );
    const serviceTicketProps = jest.mocked<ServiceTicketV1Props>(
      ({
        activityLog : jest.mocked<PropArray<ServiceTicketV1ActivityDetailProps>>(({
          getNewItem : jest.fn(() => jest.mocked<ServiceTicketV1ActivityDetailProps>({setActivityByRef : jest.fn()} as any)),
        } as Partial<PropArray<ServiceTicketV1ActivityDetailProps>> ) as any),
        setCommunityRef : jest.fn(),
        setPropertyRef : jest.fn(),
        setRequestorRef : jest.fn(),
      } as Partial<ServiceTicketV1ActivityDetailProps>) as any);

    it('should reject an long title', () => {
      // Arrange
      //201 characters ->  http://www.unit-conversion.info/texttools/random-string-generator/
      const givenInvalidTitle = 'x'.repeat(201);  
      
      // Act
      const creatingInvalidServiceTicket = () => { 
        ServiceTicketV1.getNewInstance(
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
        ServiceTicketV1.getNewInstance(
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
        ServiceTicketV1.getNewInstance(
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
        ServiceTicketV1.getNewInstance(
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