import { DatastoreVisa } from "../../src/app/datastore/datastore.visa";
import { DomainVisa } from "../../src/app/domain/domain.visa";

export interface Passport{
    domainVisa: DomainVisa;
    datastoreVisa: DatastoreVisa;
}