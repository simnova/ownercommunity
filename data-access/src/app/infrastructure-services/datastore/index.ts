import { DatastoreDomain , DatastoreDomainInitializeable} from "../../domain/infrastructure/datastore/interfaces";

export interface DatastoreInfrastructureService extends DatastoreDomain, DatastoreDomainInitializeable {
}