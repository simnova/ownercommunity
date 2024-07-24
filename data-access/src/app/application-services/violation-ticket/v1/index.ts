import { AppContext } from "../../../init/app-context-builder";
import { ViolationTicketUnitOfWork } from "../../../external-dependencies/domain";
import { ViolationTicketModel } from "../../../external-dependencies/datastore";
import { ViolationTicketDataApi, ViolationTicketDataApiImpl } from "./violation-ticket.data";
import { ViolationTicketDomainApi, ViolationTicketDomainApiImpl } from "./violation-ticket.domain";

export interface ViolationTicketV1Api {
  domainApi: ViolationTicketDomainApi;
  dataApi: ViolationTicketDataApi;
}

export class ViolationTicketV1ApiImpl implements ViolationTicketV1Api {
  domainApi: ViolationTicketDomainApi;
  dataApi: ViolationTicketDataApi;


  constructor(context: AppContext) {
    this.domainApi = new ViolationTicketDomainApiImpl({ unitOfWork: ViolationTicketUnitOfWork, context });
    this.dataApi = new ViolationTicketDataApiImpl({ modelOrCollection: ViolationTicketModel, context });
  }

}