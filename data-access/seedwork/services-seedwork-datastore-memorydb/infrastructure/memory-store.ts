import { DomainEntityProps } from "../../domain-seedwork/domain-entity";


export interface ReadOnlyMemoryStore<PropType extends DomainEntityProps> {
  get(id: string): PropType;
  getAll(): PropType[];
}

export class MemoryStore<PropType extends DomainEntityProps>  implements ReadOnlyMemoryStore<PropType>{
  private memoryStore: PropType[] = [];

  get(id: string): PropType {
    return this.memoryStore.find((item) => item.id === id);
  }
  save(item: PropType): PropType {
    const existingItem = this.memoryStore.find((i) => i.id === item.id);
    if (existingItem) {
      const index = this.memoryStore.indexOf(existingItem);
      this.memoryStore[index] = item;
    } else {
      this.memoryStore.push(item);
    }
    return item;
  }
  delete(id: string): void {
    this.memoryStore = this.memoryStore.filter((i) => i.id !== id);
  }
  getAll(): PropType[] {
    return this.memoryStore;
  }
}



