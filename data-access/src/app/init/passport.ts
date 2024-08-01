import { DatastoreVisa } from "../datastore/datastore.visa";
import { DomainVisa } from "../domain/domain.visa";

export interface Passport{
    domainVisa: DomainVisa;
    datastoreVisa: DatastoreVisa;
}