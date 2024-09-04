import { DatastoreVisa } from "./datastore.visa";
import { DomainVisa } from "../../src/components/domain/domain.visa";

export interface Passport{
    domainVisa: DomainVisa;
    datastoreVisa: DatastoreVisa;
}