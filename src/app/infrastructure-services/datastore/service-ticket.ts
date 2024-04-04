import { FindQueries, Fields } from "./_base";
import { ServiceTicket as ServiceTicketData } from "../../../infrastructure-services-impl/datastore/mongodb/models/service-ticket";

export {ServiceTicketData};
export interface ServiceTicketDatastoreInfrastructureService extends FindQueries<ServiceTicketData> {
  findByFieldsWithPopulatedValues(fields: Fields): Promise<ServiceTicketData[]>;
}