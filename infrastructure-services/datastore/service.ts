import { FindQueries } from "./_base";
import { ServiceDataStructure } from "../../application-services/datastore";

export interface ServiceDatastoreInfrastructureService extends FindQueries<ServiceDataStructure> {
}