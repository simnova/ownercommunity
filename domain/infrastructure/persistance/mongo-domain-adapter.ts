import { Base } from '../../../infrastructure/data-sources/cosmos-db/models/interfaces/base';
import { Entity, EntityProps } from '../../shared/entity';
import { PropArray } from '../../shared/prop-array';
import mongoose, {ObjectId} from 'mongoose';
import { PropertyType } from '../../contexts/property/property-value-objects';

export abstract class MongooseDomainAdapter<T extends Base> implements MongooseDomainAdapterType<T>{
  constructor(public readonly props: T) { }
  get id() {return this.props.id;}
  get createdAt() {return this.props.createdAt;}
  get updatedAt() {return this.props.updatedAt;}
  get schemaVersion() {return this.props.schemaVersion;}
}

export interface MongooseDomainAdapterType<T extends Base> extends EntityProps {
  readonly props: T;
}

export class MongoosePropArray<propType extends EntityProps, docType extends mongoose.Document> implements PropArray<propType> {
  constructor( protected docArray:mongoose.Types.DocumentArray<docType> ,protected adapter:new(doc:docType)=>propType) {}
  addItem(item: propType): propType {
    var itemId = this.docArray.push(item['props']);
    return this.docArray[itemId] as any as propType;
  }
  removeItem(item: propType): void {
  
    this.docArray.pull(item['props']);
  }
  removeAll(): void {
    var ids = this.docArray.map((doc) => doc._id);
    ids.forEach((id) => this.docArray.pull({_id: id}));
  }
  getNewItem(): propType {
    if(!this.docArray) {
      this.docArray = new mongoose.Types.DocumentArray<docType>([]);
    }
    var item = this.docArray.create({_id: new mongoose.Types.ObjectId()});
    this.docArray.push(item);
    return new this.adapter(item);
  }
  get items(): ReadonlyArray<propType> {
    return this.docArray.map((doc) => new this.adapter(doc));
  }
}

/*
export class EntityPropArray<propType extends EntityProps, docType extends mongoose.Document, entity extends Entity<propType>> extends MongoosePropArray<propType,docType>{
  removeDoc(doc: entity): void {
    this.docArray.pull(doc.props);
  }
  addItem(item: entity): entity {
    var itemId = this.docArray.push(item.props);
    var prop = this.docArray[itemId] as any as propType;
    new this.adapter(prop)
    
  }
}
*/