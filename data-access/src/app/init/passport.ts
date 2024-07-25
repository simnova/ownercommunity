import { DatastoreVisa } from "../application-services-impl/datastore/iam/datastore-visa";
import { DomainVisa } from "../domain/contexts/domain-visa";

export interface Passport{
    domainVisa: DomainVisa;
    datastoreVisa: DatastoreVisa;
}