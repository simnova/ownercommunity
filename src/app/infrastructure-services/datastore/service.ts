import { FindQueries } from "./_base";
import { Service as ServiceData} from "../../../infrastructure-services-impl/datastore/mongodb/models/service";

export {ServiceData};
export interface ServiceDatastoreInfrastructureService extends FindQueries<ServiceData> {
}