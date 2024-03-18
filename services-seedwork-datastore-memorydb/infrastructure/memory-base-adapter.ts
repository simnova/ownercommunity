
import { EntityProps } from "../../domain-seedwork/entity";
import { nanoid } from "nanoid";

// export interface MemoryDocBase {
//   id?: any;
//   schemaVersion: string;
//   createdAt?: Date;
//   updatedAt?: Date;
//   version: number;
// }
// export interface MemoryDomainAdapterType<T extends MemoryDocBase> extends EntityProps {
//   readonly doc: T;
// }
// export abstract class MemoryDomainAdapterNOTINUSE<T extends MemoryDocBase> implements MemoryDomainAdapterType<T>{
//   constructor(public readonly doc: T) { }
//   get id() {return this.doc.id || nanoid();}
//   get createdAt() {return this.doc.createdAt;}
//   get updatedAt() {return this.doc.updatedAt;}
//   get schemaVersion() {return this.doc.schemaVersion;}
// }

export abstract class MemoryBaseAdapter implements EntityProps {
    private _id: string;
    // set id(id: string) { 
    //   this._id = id; 
    // }
    get id() { 
      this._id = this._id || nanoid();
      return this._id;
    }
}


