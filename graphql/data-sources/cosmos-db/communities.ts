import { MongoDataSource } from 'apollo-datasource-mongodb';
import { Community } from '../../../infrastructure/data-sources/cosmos-db/models/community';
import { Context } from '../../context';

export class Communities extends MongoDataSource<Community, Context> {
  
  async getCommunityById(id: string): Promise<Community> {
    return this.findOneById(id);
  }
  async getCommunityByHandle(handle: string): Promise<Community> {
    return this.findByFields({handle: handle})?.[0];
  }
  async getCommunityByDomain(domain: string): Promise<Community> {
    return this.findByFields({domain: domain})?.[0];
  }

}