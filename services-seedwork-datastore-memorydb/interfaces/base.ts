export interface BaseDataStructure {
  id?: any;
  schemaVersion: string;
  createdAt?: Date;
  updatedAt?: Date;
  version: number;
}

export interface SubdocumentBaseDataStructure extends Omit<BaseDataStructure, 'schemaVersion'> {}

export interface NestedPathDataStructure {}
