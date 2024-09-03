import { DatastoreInfrastructureService } from "../../../../framework/infrastructure-services/domain.infra.interface";
import { IMemoryDatabase, MemoryDatabase } from "./memory-database";

export class MemorydbDatastoreImpl extends MemoryDatabase implements DatastoreInfrastructureService {

  constructor(private readonly db: IMemoryDatabase){
    super()
  }

  startup = async (): Promise<void> => {
    // console.log('MemorydbDatastoreImpl startup');
  }

  shutdown = async (): Promise<void> => {
    // console.log('MemorydbDatastoreImpl shutdown');
  }
}