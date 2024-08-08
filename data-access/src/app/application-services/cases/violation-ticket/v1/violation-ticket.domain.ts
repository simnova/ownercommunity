import { DomainDataSource } from '../../../../data-sources/domain-data-source';
import { Member } from '../../../../domain/contexts/community/member/member';
import { ReadOnlyDomainVisa } from '../../../../domain/domain.visa';
import { Service } from '../../../../domain/contexts/community/service/service';
import { ViolationTicketV1 } from '../../../../domain/contexts/cases/violation-ticket/v1/violation-ticket';
import { StatusCodes } from '../../../../domain/contexts/cases/violation-ticket/v1/violation-ticket.value-objects';
import { SentBy, Embedding, Message } from '../../../../domain/contexts/cases/violation-ticket/v1/violation-ticket-v1-message.value-objects';
import { MemberData, ViolationTicketData } from '../../../../external-dependencies/datastore';
import { ViolationTicketV1DomainAdapter, CommunityConverter, PropertyConverter, ViolationTicketV1Repository, MemberConverter, ServiceDomainAdapter, ServiceConverter, ViolationTicketV1Converter } from '../../../../external-dependencies/domain';
import {
  ViolationTicketCreateInput,
  ViolationTicketUpdateInput,
  ViolationTicketDeleteInput,
  ViolationTicketAssignInput,
  ViolationTicketChangeStatusInput,
  ViolationTicketAddUpdateActivityInput,
  ViolationTicketProcessPaymentInput,
  AdhocPaymentRequestInput,
  PaymentRequest
} from '../../../../external-dependencies/graphql-api';
import { AppContext } from '../../../../init/app-context-builder';
import { CybersourcePaymentTransactionResponse } from '../../../member/member.payment';

export interface ViolationTicketV1DomainApi {
  violationTicketCreate(input: ViolationTicketCreateInput): Promise<ViolationTicketData>;
  violationTicketUpdate(input: ViolationTicketUpdateInput): Promise<ViolationTicketData>;
  violationTicketDelete(input: ViolationTicketDeleteInput): Promise<ViolationTicketData>;
  violationTicketAssign(input: ViolationTicketAssignInput): Promise<ViolationTicketData>;
  violationTicketChangeStatus(input: ViolationTicketChangeStatusInput): Promise<ViolationTicketData>;
  violationTicketAddUpdateActivity(input: ViolationTicketAddUpdateActivityInput): Promise<ViolationTicketData>;
  violationTicketProcessPayment(input: ViolationTicketProcessPaymentInput): Promise<ViolationTicketData>;
  violationTicketAdhocPaymentRequest(input: AdhocPaymentRequestInput): Promise<PaymentRequest>;
}

type PropType = ViolationTicketV1DomainAdapter;
type DomainType = ViolationTicketV1<PropType>;
type RepoType = ViolationTicketV1Repository<PropType>;

export class ViolationTicketV1DomainApiImpl extends DomainDataSource<AppContext, ViolationTicketData, PropType, DomainType, RepoType> implements ViolationTicketV1DomainApi {
  async violationTicketCreate(input: ViolationTicketCreateInput): Promise<ViolationTicketData> {
    console.log(`violationTicketCreate`, this.context.verifiedUser);
    if (this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:violationTicketCreate');
    }

    let violationTicketToReturn: ViolationTicketData;
    console.log(`violationTicketCreate:community?.id`, this.context.community?.id);
    let community = await this.context.applicationServices.community.dataApi.getCommunityById(this.context.community?.id);
    let communityDo = new CommunityConverter().toDomain(community, { domainVisa: ReadOnlyDomainVisa.GetInstance() });

    let property = await this.context.applicationServices.property.dataApi.getPropertyById(input.propertyId);
    let propertyDo = new PropertyConverter().toDomain(property, { domainVisa: ReadOnlyDomainVisa.GetInstance() });

    let member: MemberData;

    member = await this.context.applicationServices.member.dataApi.getMemberById(this.context.member?.id);

    let memberDo = new MemberConverter().toDomain(member, { domainVisa: ReadOnlyDomainVisa.GetInstance() });

    let serviceDo: Service<ServiceDomainAdapter> | undefined = undefined;
    if (input.serviceId) {
      let service = await this.context.applicationServices.service.dataApi.getServiceById(input.serviceId);
      serviceDo = new ServiceConverter().toDomain(service, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
    }

    console.log(`violationTicketCreate:memberDO`, memberDo);
    console.log(`violationTicketCreate:requestorId`, member.id);

    await this.withTransaction(async (repo) => {
      let newViolationTicket = await repo.getNewInstance(input.title, input.description, communityDo, propertyDo, memberDo, input.penaltyAmount);
      if (input.serviceId) {
        newViolationTicket.Service = serviceDo;
      }

      violationTicketToReturn = new ViolationTicketV1Converter().toPersistence(await repo.save(newViolationTicket));
    });
    return violationTicketToReturn;
  }

  async violationTicketUpdate(input: ViolationTicketUpdateInput): Promise<ViolationTicketData> {
    let violationTicketToReturn: ViolationTicketData;

    let serviceDo: Service<ServiceDomainAdapter> | undefined = undefined;
    if (input.serviceId) {
      let service = await this.context.applicationServices.service.dataApi.getServiceById(input.serviceId);
      serviceDo = new ServiceConverter().toDomain(service, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
    }

    await this.withTransaction(async (repo) => {
      let violationTicket = await repo.getById(input.violationTicketId);
      if(input.penaltyAmount !== null && input.penaltyAmount !== undefined)  {violationTicket.financeDetails.ServiceFee = input.penaltyAmount;}
      let propertyDo = null;
      if (input.propertyId && violationTicket.property.id !== input.propertyId) {
        let property = await this.context.applicationServices.property.dataApi.getPropertyById(input.propertyId);
        propertyDo = new PropertyConverter().toDomain(property, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
        violationTicket.Property = propertyDo;
      }
      
      if (input.title) violationTicket.Title = input.title;
      if (input.description) violationTicket.Description = input.description;
      if (input.priority) violationTicket.Priority = input.priority;
      if (input.serviceId) {
        violationTicket.Service = serviceDo;
      }

      if (input.messages !== undefined) {
        for (const messageInput of input.messages) {
          if (!messageInput.id) {
            if (messageInput.initiatedBy !== undefined) {
              let member = await this.context.applicationServices.member.dataApi.getMemberById(messageInput.initiatedBy);
              let memberDo = new MemberConverter().toDomain(member, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
              if (memberDo) messageInput.initiatedBy = memberDo;
            }
            violationTicket.requestAddMessage(messageInput.message, messageInput.sentBy, messageInput?.embedding, messageInput?.initiatedBy);
          } else {
            let messageToUpdate = violationTicket.messages.find((m) => m.id === messageInput.id);
            if (messageToUpdate) {
              if (messageInput.sentBy !== undefined) messageToUpdate.SentBy = new SentBy(messageInput.sentBy);
              if (messageInput.message !== undefined) messageToUpdate.Message = new Message(messageInput.message);
              if (messageInput.embedding !== undefined) messageToUpdate.Embedding = new Embedding(messageInput.embedding);
              if (messageInput.initiatedBy !== undefined) {
                let member = await this.context.applicationServices.member.dataApi.getMemberById(messageInput.initiatedBy);
                let memberDo = new MemberConverter().toDomain(member, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
                if (memberDo) messageToUpdate.InitiatedBy = memberDo;
              }
              if (messageInput.isHiddenFromApplicant !== undefined) messageToUpdate.IsHiddenFromApplicant = messageInput.isHiddenFromApplicant;
            }
          }
        }
      }

      if (input.revisionRequest !== undefined) {
        if (input.revisionRequest?.requestedAt !== undefined) {
          // clear revision submitted at if requested at is updated
          input.revisionRequest.revisionSubmittedAt = null;
          violationTicket.revisionRequest.RequestedAt = (input.revisionRequest.requestedAt);
        }
        if (input.revisionRequest?.requestedBy !== undefined) {
          let member = await this.context.applicationServices.member.dataApi.getMemberById(input.revisionRequest.requestedBy);
          let memberDo = new MemberConverter().toDomain(member, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
          violationTicket.revisionRequest.RequestedBy = memberDo;
        }
        if (input.revisionRequest?.revisionSummary !== undefined) {
          violationTicket.revisionRequest.RevisionSummary = input.revisionRequest.revisionSummary;
        }
        if (input.revisionRequest?.requestedChanges !== undefined) {
          if (input.revisionRequest?.requestedChanges?.requestUpdatedAssignment !== undefined) {
            violationTicket.revisionRequest.requestedChanges.RequestUpdatedAssignment = input.revisionRequest.requestedChanges.requestUpdatedAssignment;
          }
          if (input.revisionRequest?.requestedChanges?.requestUpdatedProperty !== undefined) {
            violationTicket.revisionRequest.requestedChanges.RequestUpdatedProperty = input.revisionRequest.requestedChanges.requestUpdatedProperty;
          }
          if (input.revisionRequest?.requestedChanges?.requestUpdatedStatus !== undefined) {
            violationTicket.revisionRequest.requestedChanges.RequestUpdatedStatus = input.revisionRequest.requestedChanges.requestUpdatedStatus;
          }
          if (input.revisionRequest?.requestedChanges?.requestUpdatedPaymentTransaction !== undefined) {
            violationTicket.revisionRequest.requestedChanges.RequestUpdatedPaymentTransaction = input.revisionRequest.requestedChanges.requestUpdatedPaymentTransaction;
          }
        }
        if (input.revisionRequest?.revisionSubmittedAt !== undefined) {
          violationTicket.revisionRequest.RevisionSubmittedAt = input.revisionRequest.revisionSubmittedAt;
        }
      }

      violationTicketToReturn = new ViolationTicketV1Converter().toPersistence(await repo.save(violationTicket));
    });
    return violationTicketToReturn;
  }

  async violationTicketDelete(input: ViolationTicketDeleteInput): Promise<ViolationTicketData> {
    let violationTicketToReturn: ViolationTicketData;
    await this.withTransaction(async (repo) => {
      let violationTicket = await repo.getById(input.violationTicketId);
      violationTicket.requestDelete();
      violationTicketToReturn = new ViolationTicketV1Converter().toPersistence(await repo.save(violationTicket));
    });
    return violationTicketToReturn;
  }

  async violationTicketAssign(input: ViolationTicketAssignInput): Promise<ViolationTicketData> {
    let violationTicketToReturn: ViolationTicketData;
    let memberDo: Member<any> | undefined = undefined;
    if (input.assignedToId) {
      let member = await this.context.applicationServices.member.dataApi.getMemberById(input.assignedToId);
      memberDo = new MemberConverter().toDomain(member, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
    }
    await this.withTransaction(async (repo) => {
      let violationTicket = await repo.getById(input.violationTicketId);
      violationTicket.AssignedTo = memberDo;
      violationTicketToReturn = new ViolationTicketV1Converter().toPersistence(await repo.save(violationTicket));
    });
    return violationTicketToReturn;
  }

  async violationTicketChangeStatus(input: ViolationTicketChangeStatusInput): Promise<ViolationTicketData> {
    let member = await this.context.applicationServices.member.dataApi.getMemberById(this.context.member?.id);
    let memberDo = new MemberConverter().toDomain(member, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
    let violationTicketToReturn: ViolationTicketData;
    await this.withTransaction(async (repo) => {
      let violationTicket = await repo.getById(input.violationTicketId);
      violationTicket.requestAddStatusTransition(input.status, input.activityDescription, memberDo);
      violationTicketToReturn = new ViolationTicketV1Converter().toPersistence(await repo.save(violationTicket));
    });
    return violationTicketToReturn;
  }

  async violationTicketAddUpdateActivity(input: ViolationTicketAddUpdateActivityInput): Promise<ViolationTicketData> {
    let member = await this.context.applicationServices.member.dataApi.getMemberById(this.context.member?.id);
    let memberDo = new MemberConverter().toDomain(member, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
    let violationTicketToReturn: ViolationTicketData;
    await this.withTransaction(async (repo) => {
      let violationTicket = await repo.getById(input.violationTicketId);
      violationTicket.requestAddStatusUpdate(input.activityDescription, memberDo);
      violationTicketToReturn = new ViolationTicketV1Converter().toPersistence(await repo.save(violationTicket));
    });
    return violationTicketToReturn;
  }

  async violationTicketProcessPayment(input: ViolationTicketProcessPaymentInput): Promise<ViolationTicketData> {
    let violationTicketToReturn: ViolationTicketData;
    await this.withTransaction(async (repo) => {
      let violationTicket = await repo.getById(input.violationTicketId);

      // perform validation for is payment already received
      if (violationTicket.status === StatusCodes.Paid) {
        throw new Error('Payment already received');
      }

      // perform validation for is payment amount is valid
      if (input.paymentAmount !== violationTicket.financeDetails.serviceFee) {
        throw new Error('Invalid payment amount');
      }

      // perform validation to check status of ticket
      if (violationTicket.status !== StatusCodes.Assigned) {
        throw new Error('Ticket is not in a valid state to process payment');
      }

      // perform payment processing
      const response: CybersourcePaymentTransactionResponse = await this.context.applicationServices.member.cybersourceApi.processPayment({
        clientReferenceCode: violationTicket.id,
        paymentInstrumentId: input.paymentInstrumentId,
        amount: input.paymentAmount
      });
      // update ticket status
      if(response && response.referenceId) {
        let member = await this.context.applicationServices.member.dataApi.getMemberById(this.context.member?.id);
        let memberDo = new MemberConverter().toDomain(member, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
        violationTicket.requestAddStatusTransition('PAID', 'Paid for violation ticket', memberDo);
        
        // update ticket transaction details
        if(response.referenceId) {violationTicket.financeDetails.transactions.submission.transactionReference.ReferenceId = response.referenceId;};
        violationTicket.financeDetails.transactions.submission.transactionReference.Vendor = response.vendor;
        if(response.completedOn) {violationTicket.financeDetails.transactions.submission.transactionReference.CompletedOn = response.completedOn;};
        if(response.authorizedAmount) {violationTicket.financeDetails.transactions.submission.Amount = response.authorizedAmount;};
      } else {
        throw new Error('Payment processing failed');
      }
        // save the transaction details
      violationTicketToReturn = new ViolationTicketV1Converter().toPersistence(await repo.save(violationTicket));
    });
    return violationTicketToReturn;
  }

  async violationTicketAdhocPaymentRequest(input: AdhocPaymentRequestInput): Promise<PaymentRequest> {
    let member = await this.context.applicationServices.member.dataApi.getMemberById(this.context.member?.id);
    let memberDo = new MemberConverter().toDomain(member, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
    let paymentRequestToReturn: PaymentRequest;
    await this.withTransaction(async (repo) => {
      let violationTicket = await repo.getById(input.violationTicketId);
      let adhocTransaction = violationTicket.financeDetails.transactions.requestAddNewAdhocTransaction();
      adhocTransaction.Amount = input.amount;
      adhocTransaction.RequestedBy = memberDo;
      adhocTransaction.RequestedOn = new Date();
      adhocTransaction.Reason = input.reason;
      new ViolationTicketV1Converter().toPersistence(await repo.save(violationTicket));
      paymentRequestToReturn = {
        amount: adhocTransaction.amount,
        reason: adhocTransaction.reason,
        paymentRequestId: adhocTransaction.id,
      }
    });
    return paymentRequestToReturn;
  }
}

