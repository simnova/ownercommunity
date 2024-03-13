import { EntityProps } from "../../../../../../../domain/shared/entity";
import { PropArray } from "../../../../../../../domain/shared/prop-array";
import { MemoryDocBase } from "./memory-domain-adapter";




export class MemoryPropArray<propType extends EntityProps, docType extends MemoryDocBase> implements PropArray<propType> {
  constructor(protected docArray: Array<docType>, protected adapter: new (doc: docType) => propType) { }
  addItem(item: propType): propType {
    const itemId = this.docArray.push(item['doc']);
    return this.docArray[itemId] as any as propType;
  }
  removeItem(item: propType): void {
    this.docArray.filter(doc => doc.id !== item['doc']['_id']);
  }
  removeAll(): void {
    this.docArray = [];
  }
  getNewItem(): propType {
    if (!this.docArray) {
      this.docArray = new Array<docType>();
    }
    const item: docType = this.adapter.prototype.getNewItem();
    this.docArray.push(item);
    return new this.adapter(item);
  }
  get items(): ReadonlyArray<propType> {
    return this.docArray.map((doc) => new this.adapter(doc));
  }
}
