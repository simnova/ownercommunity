import { InMemoryLRUCache, KeyValueCache } from '@apollo/utils.keyvaluecache'
import { createCachingMethods } from './cache'
import { isCollectionOrModel, isModel } from './helpers'
import { GraphQLError } from 'graphql'

import { Collection as MongoCollection, ObjectId } from 'mongodb'
import {
  Collection as MongooseCollection,
  Document,
  Model as MongooseModel,
} from 'mongoose'

export interface MongoDataSourceConfig<TData> {
  collection: ModelOrCollection<TData>
  cache?: KeyValueCache<TData>
}

export type Collection<T, U = MongoCollection<T>> = T extends Document
? MongooseCollection
: U

export type Model<T, U = MongooseModel<T>> = T extends Document
? U
: undefined

export type ModelOrCollection<T, U = Model<T>> = T extends Document
? U
: Collection<T>


export interface Fields {
  [fieldName: string]:
    | string
    | number
    | boolean
    | ObjectId
    | (string | number | boolean | ObjectId)[]
}

export interface Options {
  ttl: number
}

class MongoDataSource<TData> {
  protected collection: Collection<TData>;
  protected model: Model<TData>;

  constructor({ collection, cache }: MongoDataSourceConfig<TData>) {
    if (!isCollectionOrModel(collection)) {
      throw new GraphQLError(
        'MongoDataSource constructor must be given a collection or Mongoose model'
      )
    }

    if (isModel(collection)) {
      this.model = collection as Model<TData>
      this.collection = this.model.collection as Collection<TData>
    } else {
      this.collection = collection as Collection<TData>
    }

    const methods = createCachingMethods({
      collection: this.collection,
      model: this.model,
      cache: cache || new InMemoryLRUCache()
    })

    Object.assign(this, methods)
  }

  findOneById(id: string | ObjectId, options?: Options): Promise<TData> {
    return {} as any;
  }

  findManyByIds(ids: (string | ObjectId)[], options?: Options): Promise<TData[]> {
    return [] as any;
  }

  findByFields(fields: Fields, options?: Options): Promise<TData[]> {
    return [] as any;
  }

  deleteFromCacheById(id: string | ObjectId): Promise<void> {
    return {} as any;
  }

  deleteFromCacheByFields(fields: Fields): Promise<void> {
    return {} as any;
  }
}

export { MongoDataSource }
