import { DatastoreVisa } from "../application-services-impl/datastore/iam/datastore-visa";
import { DomainVisa } from "../domain/contexts/iam/domain-visa";

export interface Passport{
    domainVisa: DomainVisa;
    datastoreVisa: DatastoreVisa;
}