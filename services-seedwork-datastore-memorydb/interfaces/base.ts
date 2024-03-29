interface Base {
  id?: any;
  schemaVersion: string;
  createdAt?: Date;
  updatedAt?: Date;
  version?: number;

}
export interface BaseDataStructure extends Base {
  id: any;
}

export interface SubdocumentBaseDataStructure extends Omit<Base, 'schemaVersion'> {
}

export interface NestedPathDataStructure {}
