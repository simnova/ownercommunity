export interface Fields {
  [fieldName: string]:
    | string
    | number
    | boolean
    | (string | number | boolean)[]
}

export interface FindQueries<TData> {
  findOneById(id: string): Promise<TData | null | undefined>;
  findManyByIds(ids: string[]): Promise<(TData | null | undefined)[]>;
  findByFields(fields: Fields): Promise<(TData | null | undefined)[]>;
}
