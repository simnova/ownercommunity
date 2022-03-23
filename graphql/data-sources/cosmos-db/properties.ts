import { MongoDataSource } from 'apollo-datasource-mongodb';
import { Property } from '../../../infrastructure/data-sources/cosmos-db/models/property';
import { Context } from '../../context';

export class Properties extends MongoDataSource<Property, Context> {
  async getPropertiesByCommunityId(communityId : string, userId: string): Promise<Property[]> {
    return this.findByFields({community: communityId});
  }
}