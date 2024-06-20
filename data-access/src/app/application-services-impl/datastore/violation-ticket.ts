import { ViolationTicketData } from '../../external-dependencies/datastore';
import { CosmosDataSource } from './cosmos-data-source';
import { ViolationTicketDataApi } from '../../application-services/datastore';
import { AppContext } from '../../init/app-context-builder';

export class ViolationTicketDataApiImpl 
  extends CosmosDataSource<ViolationTicketData, AppContext> 
  implements ViolationTicketDataApi
{
  async getViolationTicketById(id: string): Promise<ViolationTicketData> {
    let dbData = await this.model.findById(id).populate(['community', 'property', 'requestor', 'assignedTo']).exec();
    return dbData;
  }
}
