import { FindQueries } from "./_base";
import { UserDataStructure } from "../../application-services/datastore";

type PropType = UserDataStructure;
export interface UserDatastoreInfrastructureService extends FindQueries<PropType> {
  getAll(): Promise<PropType[]>;
}