import { FindQueries } from "./_base";
import { UserDataStructure } from "../../application-services/datastore";

export interface UserDatastoreInfrastructureService extends FindQueries<UserDataStructure> {
  getAll(): Promise<UserDataStructure[]>;
}