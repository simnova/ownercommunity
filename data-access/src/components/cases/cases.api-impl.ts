import { AppContext } from '../../../../framework/app/app-context-builder';
import { ServiceTicketApi, ServiceTicketApiImpl } from './service-ticket';
import { ViolationTicketApi, ViolationTicketApiImpl } from '../application-services/cases/violation-ticket';

export interface CasesApi { 
  serviceTicket: ServiceTicketApi;
  violationTicket: ViolationTicketApi
}

export class CasesApiImpl implements CasesApi {
    serviceTicket: ServiceTicketApi;
    violationTicket: ViolationTicketApi

  constructor(context: AppContext) {
    this.serviceTicket = new ServiceTicketApiImpl(context);
    this.violationTicket = new ViolationTicketApiImpl(context);
  }
}