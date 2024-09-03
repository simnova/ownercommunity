import { DatastoreVisa } from "../components/datastore/datastore.visa";
import { DomainVisa } from "../components/domain/domain.visa";

export interface Passport{
    domainVisa: DomainVisa;
    datastoreVisa: DatastoreVisa;
}