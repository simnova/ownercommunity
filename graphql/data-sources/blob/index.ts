import { Communities } from "./communities";
import { Members } from "./members";
import { Properties } from "./properties";

export const Blob  = {
  communityBlobAPI: new Communities(),
  memberBlobAPI: new Members(),
  propertyBlobAPI: new Properties(),
}