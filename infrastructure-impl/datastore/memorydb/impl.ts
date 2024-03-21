import { DatastoreInfrastructure } from "../interfaces";
import { MemoryDatabase } from "./memory-database";

export class MemorydbDatastoreImpl extends MemoryDatabase implements DatastoreInfrastructure {
  
  constructor() {
      super();
  }

  startup = async (): Promise<void> => {
    console.log('MemorydbDatastoreImpl startup');
  }

  shutdown = async (): Promise<void> => {
    console.log('MemorydbDatastoreImpl shutdown');
  }

}