import { AppContext } from '../../init/app-context-builder';
import { ViolationTicketV1Api, ViolationTicketV1ApiImpl } from './v1';

export interface ViolationTicketApi { 
  v1: ViolationTicketV1Api;
}

export class ViolationTicketApiImpl implements ViolationTicketApi {
  v1: ViolationTicketV1Api;

  constructor(context: AppContext) {
    this.v1 = new ViolationTicketV1ApiImpl(context);
  }
}