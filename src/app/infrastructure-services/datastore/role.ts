import { FindQueries } from "./_base";
import { Role as RoleData} from "../../../infrastructure-services-impl/datastore/mongodb/models/role";

export {RoleData};
export interface RoleDatastoreInfrastructureService extends FindQueries<RoleData> {
}