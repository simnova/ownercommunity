import { DatastoreInfrastructureService } from "../../../infrastructure-services/datastore";
import { MemoryDatabase } from "./memory-database";

export class MemorydbDatastoreImpl extends MemoryDatabase implements DatastoreInfrastructureService {
  
  constructor() {
      super();
  }

  startup = async (): Promise<void> => {
    // console.log('MemorydbDatastoreImpl startup');
  }

  shutdown = async (): Promise<void> => {
    // console.log('MemorydbDatastoreImpl shutdown');
  }

}