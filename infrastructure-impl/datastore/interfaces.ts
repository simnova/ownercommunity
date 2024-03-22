import { DatastoreDomain , DatastoreDomainInitializeable} from "../../domain/infrastructure/datastore/interfaces";

export interface DatastoreInfrastructure extends DatastoreDomain, DatastoreDomainInitializeable {}