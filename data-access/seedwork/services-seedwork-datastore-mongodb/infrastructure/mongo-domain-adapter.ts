import { Base } from '../interfaces/base';
import { DomainEntityProps } from '../../domain-seedwork/domain-entity';
import { PropArray } from '../../domain-seedwork/prop-array';
import mongoose from 'mongoose';
import { InfrastructureContextBase } from '../../infrastructure-seedwork/infrastructure-context-base';

export abstract class MongooseDomainAdapter<T extends Base, InfrastructureContextType extends InfrastructureContextBase> implements MongooseDomainAdapterType<T>{
  constructor(public readonly doc: T, public readonly infrastructureContext: InfrastructureContextType) { }
  get id() {return this.doc.id;}
  get createdAt() {return this.doc.createdAt;}
  get updatedAt() {return this.doc.updatedAt;}
  get schemaVersion() {return this.doc.schemaVersion;}
}

export interface MongooseDomainAdapterType<T extends Base> extends DomainEntityProps {
  readonly doc: T;
}

export class MongoosePropArray<propType extends DomainEntityProps, docType extends mongoose.Document, InfrastructureContextType extends InfrastructureContextBase> implements PropArray<propType> {
  constructor( protected docArray:mongoose.Types.DocumentArray<docType> ,protected adapter:new(doc:docType, infrastructureContext: InfrastructureContextType)=>propType, private readonly infrastructureContext: InfrastructureContextType) {}
  addItem(item: propType): propType {
    const itemId = this.docArray.push(item['doc']);
    return this.docArray[itemId] as any as propType;
  }
  removeItem(item: propType): void {
    this.docArray.pull({_id:item['props']['_id'] } );
  }
  removeAll(): void {
    const ids = this.docArray.map((doc) => doc._id);
    ids.forEach((id) => this.docArray.pull({_id: id}));
  }
  getNewItem(): propType {
    if(!this.docArray) {
      this.docArray = new mongoose.Types.DocumentArray<docType>([]);
    }
    const item = this.docArray.create({_id: new mongoose.Types.ObjectId()});
    this.docArray.push(item);
    return new this.adapter(item, this.infrastructureContext);
  }
  get items(): ReadonlyArray<propType> {
    return this.docArray.map((doc) => new this.adapter(doc, this.infrastructureContext));
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