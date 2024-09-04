import { AppContext } from "../../../../../../framework/app/app-context-builder";
import { ViolationTicketV1UnitOfWork } from "../../../external-dependencies/domain";
import { ViolationTicketModel } from "../../../external-dependencies/datastore";
import { ViolationTicketV1DataApi, ViolationTicketV1DataApiImpl } from "./violation-ticket-v1.data";
import { ViolationTicketV1DomainApi, ViolationTicketV1DomainApiImpl } from "./violation-ticket-v1.domain";

interface ViolationTicketV1Api {
  domainApi: ViolationTicketV1DomainApi;
  dataApi: ViolationTicketV1DataApi;
}

class ViolationTicketV1ApiImpl implements ViolationTicketV1Api {
  domainApi: ViolationTicketV1DomainApi;
  dataApi: ViolationTicketV1DataApi;


  constructor(context: AppContext) {
    this.domainApi = new ViolationTicketV1DomainApiImpl({ unitOfWork: ViolationTicketV1UnitOfWork, context });
    this.dataApi = new ViolationTicketV1DataApiImpl({ modelOrCollection: ViolationTicketModel, context });
  }

}

export interface ViolationTicketApi { 
  v1: ViolationTicketV1Api;
}

export class ViolationTicketApiImpl implements ViolationTicketApi {
  v1: ViolationTicketV1Api;

  constructor(context: AppContext) {
    this.v1 = new ViolationTicketV1ApiImpl(context);
  }
}