import { EntityProps } from "../../domain-seedwork/entity";
import { PropArray } from "../../domain-seedwork/prop-array";

export class MemoryPropArray<propType extends EntityProps> implements PropArray<propType> {
  constructor(protected itemArray: Array<propType>, protected classDefinition: new () => propType) { }
  addItem(itemToBeAdded: propType): propType {
    // const itemId = this.docArray.push(item['doc']);
    const newItemIndex = this.itemArray.push(itemToBeAdded);
    return this.itemArray[newItemIndex]; // as any as propType;
  }
  removeItem(itemToBeRemoved: propType): void {
    this.itemArray.filter(item => item.id !== itemToBeRemoved.id);
  }
  removeAll(): void {
    this.itemArray = [];
  }
  getNewItem(): propType {
    if (!this.itemArray) {
      this.itemArray = new Array<propType>();
    }
    const item: propType = new this.classDefinition()//.prototype; //.getNewItem();
    this.itemArray.push(item);
    return item;
  }
  get items(): ReadonlyArray<propType> {
    return this.itemArray;
  }
}
