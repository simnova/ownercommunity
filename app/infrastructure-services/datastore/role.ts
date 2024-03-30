import { FindQueries } from "./_base";
import { RoleDataStructure } from "../../application-services/datastore";

type PropType = RoleDataStructure;
export interface RoleDatastoreInfrastructureService extends FindQueries<PropType> {
}