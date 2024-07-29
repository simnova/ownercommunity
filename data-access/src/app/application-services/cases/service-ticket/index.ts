import { AppContext } from '../../../init/app-context-builder';
import { ServiceTicketV1Api, ServiceTicketV1ApiImpl } from './v1';

export interface ServiceTicketApi { 
  v1: ServiceTicketV1Api;
}

export class ServiceTicketApiImpl implements ServiceTicketApi {
  v1: ServiceTicketV1Api;

  constructor(context: AppContext) {
    this.v1 = new ServiceTicketV1ApiImpl(context);
  }
}