import { Communities } from "./communities";
import { Members } from "./members";

export const Blob  = {
  communityBlobAPI: new Communities(),
  memberBlobAPI: new Members()
}

export type BlobType = typeof Blob;