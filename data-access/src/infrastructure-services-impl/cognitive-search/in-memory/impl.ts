import { MemoryCognitiveSearch} from "../../../../seedwork/services-seedwork-cognitive-search-in-memory";
import { CognitiveSearchInfrastructureService } from "../../../app/infrastructure-services/cognitive-search";

export class MemoryCognitiveSearchImpl extends MemoryCognitiveSearch implements CognitiveSearchInfrastructureService {
  constructor() {
      super();
  }

  startup = async (): Promise<void> => {
    // console.log('MemoryCognitiveSearchImpl startup');
  }

  shutdown = async (): Promise<void> => {
    // console.log('MemoryCognitiveSearchImpl shutdown');
  }

  logIndexes(): void {
    console.log("MemoryCognitiveSearchImpl - logIndexes");
  }

  // private static instance: MemoryCognitiveSearchImpl;
  // public static getInstance(): MemoryCognitiveSearchImpl {
  //   if (!this.instance) {
  //     this.instance = new this();
  //   }
  //   return this.instance;
  // }
}
