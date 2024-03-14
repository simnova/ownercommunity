import { EntityProps } from "../../../../../../../domain/shared/entity";
import { PropArray } from "../../../../../../../domain/shared/prop-array";

export class MemoryPropArray<propType extends EntityProps> implements PropArray<propType> {
  constructor(protected docArray: Array<propType>, protected classDefinition: new () => propType) { }
  addItem(item: propType): propType {
    const itemId = this.docArray.push(item['doc']);
    return this.docArray[itemId] as any as propType;
  }
  removeItem(item: propType): void {
    this.docArray.filter(doc => doc.id !== item.id);
  }
  removeAll(): void {
    this.docArray = [];
  }
  getNewItem(): propType {
    if (!this.docArray) {
      this.docArray = new Array<propType>();
    }
    const item: propType = this.classDefinition.prototype; //.getNewItem();
    this.docArray.push(item);
    return item;
  }
  get items(): ReadonlyArray<propType> {
    return this.docArray;
  }
}
