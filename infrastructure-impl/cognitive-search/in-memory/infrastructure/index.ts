import { MemoryCognitiveSearch} from "../../../../services-seedwork-cognitive-search-in-memory";
import { CognitiveSearchInfrastructure } from "../../interfaces";

export class MemoryCognitiveSearchImpl extends MemoryCognitiveSearch implements CognitiveSearchInfrastructure {
  private constructor() {
      super();
  }

  private static instance: MemoryCognitiveSearchImpl;
  public static getInstance(): MemoryCognitiveSearchImpl {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }
}
