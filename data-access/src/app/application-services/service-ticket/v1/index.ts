import { AppContext } from "../../../init/app-context-builder";
import { ServiceTicketDataApi, ServiceTicketDataApiImpl } from "./service-ticket.data";
import { ServiceTicketDomainApi, ServiceTicketDomainApiImpl } from "./service-ticket.domain";
import { ServiceTicketV1UnitOfWork } from "../../../external-dependencies/domain";
import { ServiceTicketModel } from "../../../external-dependencies/datastore";
import { ServiceTicketSearchApi, ServiceTicketSearchApiImpl } from "./service-ticket.search";

export interface ServiceTicketV1Api {
  domainApi: ServiceTicketDomainApi;
  dataApi: ServiceTicketDataApi;
  searchApi: ServiceTicketSearchApi;
}

export class ServiceTicketV1ApiImpl implements ServiceTicketV1Api {
  domainApi: ServiceTicketDomainApi;
  dataApi: ServiceTicketDataApi;
  searchApi: ServiceTicketSearchApi;

  constructor(context: AppContext) {
    this.domainApi = new ServiceTicketDomainApiImpl({ unitOfWork: ServiceTicketV1UnitOfWork, context });
    this.dataApi = new ServiceTicketDataApiImpl({ modelOrCollection: ServiceTicketModel, context });
    this.searchApi = new ServiceTicketSearchApiImpl({ context });
  }

}