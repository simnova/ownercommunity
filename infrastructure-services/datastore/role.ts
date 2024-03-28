import { FindQueries } from "./_base";
import { RoleDataStructure } from "../../application-services/datastore";

export interface RoleDatastoreInfrastructureService extends FindQueries<RoleDataStructure> {
}