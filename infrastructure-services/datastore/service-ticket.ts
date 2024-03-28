import { FindQueries, Fields } from "./_base";
import { ServiceTicketDataStructure } from "../../application-services/datastore";

export interface ServiceTicketDatastoreInfrastructureService extends FindQueries<ServiceTicketDataStructure> {
  findByFieldsWithPopulatedValues(fields: Fields): Promise<ServiceTicketDataStructure[]>;
}