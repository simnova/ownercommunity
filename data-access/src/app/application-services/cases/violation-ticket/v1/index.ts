import { AppContext } from "../../../../../../framework/app/app-context-builder";
import { ViolationTicketV1UnitOfWork } from "../../../../external-dependencies/domain";
import { ViolationTicketModel } from "../../../../external-dependencies/datastore";
import { ViolationTicketV1DataApi, ViolationTicketV1DataApiImpl } from "./violation-ticket.data";
import { ViolationTicketV1DomainApi, ViolationTicketV1DomainApiImpl } from "./violation-ticket.domain";

export interface ViolationTicketV1Api {
  domainApi: ViolationTicketV1DomainApi;
  dataApi: ViolationTicketV1DataApi;
}

export class ViolationTicketV1ApiImpl implements ViolationTicketV1Api {
  domainApi: ViolationTicketV1DomainApi;
  dataApi: ViolationTicketV1DataApi;


  constructor(context: AppContext) {
    this.domainApi = new ViolationTicketV1DomainApiImpl({ unitOfWork: ViolationTicketV1UnitOfWork, context });
    this.dataApi = new ViolationTicketV1DataApiImpl({ modelOrCollection: ViolationTicketModel, context });
  }

}