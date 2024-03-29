import { FindQueries, Fields } from "./_base";
import { ServiceTicketDataStructure } from "../../application-services/datastore";

type PropType = ServiceTicketDataStructure;
export interface ServiceTicketDatastoreInfrastructureService extends FindQueries<PropType> {
  findByFieldsWithPopulatedValues(fields: Fields): Promise<PropType[]>;
}