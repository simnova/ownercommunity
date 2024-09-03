import { DatastoreVisa } from "../../src/components/datastore/datastore.visa";
import { DomainVisa } from "../../src/components/domain/domain.visa";

export interface Passport{
    domainVisa: DomainVisa;
    datastoreVisa: DatastoreVisa;
}