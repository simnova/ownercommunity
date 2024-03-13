
import { EntityProps } from "../../../../../../../domain/shared/entity";

export interface MemoryDocBase {
  id?: any;
  schemaVersion: string;
  createdAt?: Date;
  updatedAt?: Date;
  version: number;
}
export interface MemoryDomainAdapterType<T extends MemoryDocBase> extends EntityProps {
  readonly doc: T;
}
export abstract class MemoryDomainAdapter<T extends MemoryDocBase> implements MemoryDomainAdapterType<T>{
  constructor(public readonly doc: T) { }
  get id() {return this.doc.id;}
  get createdAt() {return this.doc.createdAt;}
  get updatedAt() {return this.doc.updatedAt;}
  get schemaVersion() {return this.doc.schemaVersion;}
}




