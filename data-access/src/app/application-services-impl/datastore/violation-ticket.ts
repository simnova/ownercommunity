import { AdminTicketData, AdminTicketModel } from '../../external-dependencies/datastore';
import { CosmosDataSource } from './cosmos-data-source';
import { ViolationTicketDataApi } from '../../application-services/datastore';
import { AppContext } from '../../init/app-context-builder';

export class ViolationTicketDataApiImpl 
  extends CosmosDataSource<AdminTicketData, AppContext> 
  implements ViolationTicketDataApi
{
  async getViolationTicketById(id: string): Promise<AdminTicketData> {
    let dbData = await AdminTicketModel.findById(id).populate(['community', 'property', 'requestor', 'assignedTo']).exec();
    return dbData;
  }
}
