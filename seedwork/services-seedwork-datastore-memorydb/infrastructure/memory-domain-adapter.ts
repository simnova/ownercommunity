// import { BaseDataStructure } from '../interfaces/base';
// import { EntityProps } from '../../domain-seedwork/entity';
// import { nanoid } from "nanoid";

// export abstract class MemoryDomainAdapter<T extends BaseDataStructure> implements MemoryDomainAdapterType<T>{
//   private _id: string;
//   constructor(public readonly doc: T) { }

//   get id() { 
//     this._id = this._id || nanoid();
//     return this._id;
//   }
//   // get id() {return this.doc.id;}
//   // get createdAt() {return this.doc.createdAt;}
//   // get updatedAt() {return this.doc.updatedAt;}
//   // get schemaVersion() {return this.doc.schemaVersion;}
// }

// export interface MemoryDomainAdapterType<T extends BaseDataStructure> extends EntityProps {
//   readonly doc: T;
// }
{}