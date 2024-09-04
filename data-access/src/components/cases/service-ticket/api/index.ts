import { AppContext } from "../../../../../../framework/app/app-context-builder";
import { ServiceTicketV1DataApi, ServiceTicketV1DataApiImpl } from "./service-ticket-v1.data";
import { ServiceTicketV1DomainApi, ServiceTicketV1DomainApiImpl } from "./service-ticket-v1.domain";
import { ServiceTicketV1UnitOfWork } from "../../../external-dependencies/domain";
import { ServiceTicketModel } from "../../../external-dependencies/datastore";
import { ServiceTicketV1SearchApi, ServiceTicketV1SearchApiImpl } from "./service-ticket-v1.search";

interface ServiceTicketV1Api {
  domainApi: ServiceTicketV1DomainApi;
  dataApi: ServiceTicketV1DataApi;
  searchApi: ServiceTicketV1SearchApi;
}

class ServiceTicketV1ApiImpl implements ServiceTicketV1Api {
  domainApi: ServiceTicketV1DomainApi;
  dataApi: ServiceTicketV1DataApi;
  searchApi: ServiceTicketV1SearchApi;

  constructor(context: AppContext) {
    this.domainApi = new ServiceTicketV1DomainApiImpl({ unitOfWork: ServiceTicketV1UnitOfWork, context });
    this.dataApi = new ServiceTicketV1DataApiImpl({ modelOrCollection: ServiceTicketModel, context });
    this.searchApi = new ServiceTicketV1SearchApiImpl({ context });
  }

}

export interface ServiceTicketApi { 
  v1: ServiceTicketV1Api;
}

export class ServiceTicketApiImpl implements ServiceTicketApi {
  v1: ServiceTicketV1Api;

  constructor(context: AppContext) {
    this.v1 = new ServiceTicketV1ApiImpl(context);
  }
}