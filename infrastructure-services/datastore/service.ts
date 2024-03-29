import { FindQueries } from "./_base";
import { ServiceDataStructure } from "../../application-services/datastore";

type PropType = ServiceDataStructure;
export interface ServiceDatastoreInfrastructureService extends FindQueries<PropType> {
}