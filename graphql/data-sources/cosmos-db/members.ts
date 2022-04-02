import { MongoDataSource } from 'apollo-datasource-mongodb';
import { Member } from '../../../infrastructure/data-sources/cosmos-db/models/member';
import { Context } from '../../context';

export class Members extends MongoDataSource<Member, Context> {
  
  async getMemberByCommunityIdUserId(communityId : string, userId: string): Promise<Member> {
    return (await this.findByFields({community: communityId, 'accounts.user': userId}))?.[0];
  }
  async getMembers(): Promise<Member[]> {
    return this.findByFields({community: this.context.community});
  }
  
}