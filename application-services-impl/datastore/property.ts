import { Context } from '../../startup/context';
import { PropertyDatastoreApplicationService } from '../../application-services/datastore/property.interface';
import { DatastoreApplicationServiceImpl } from './_datastore.application-service';
import { PropertyDataStructure } from '../../application-services/datastore';

export class PropertyDatastoreApplicationServiceImpl 
  extends DatastoreApplicationServiceImpl<Context> 
  implements PropertyDatastoreApplicationService
{

  async getPropertiesByCommunityId(communityId: string): Promise<PropertyDataStructure[]> {
    let propertyToReturn: PropertyDataStructure[];
    await this.withDatastore(async (_passport, datastore) => {
      propertyToReturn = await datastore.propertyDatastore.findByFields({ community: communityId });
    });
    return propertyToReturn;
  }

  async getPropertiesByIds(propertyIds: string[]): Promise<PropertyDataStructure[]> {
    let propertyToReturn: PropertyDataStructure[];
    await this.withDatastore(async (_passport, datastore) => {
      propertyToReturn = await datastore.propertyDatastore.findManyByIds(propertyIds);
    });
    return propertyToReturn;
  }

  async getAllProperties(): Promise<PropertyDataStructure[]> {
    let propertyToReturn: PropertyDataStructure[];
    await this.withDatastore(async (_passport, datastore) => {
      propertyToReturn = await datastore.propertyDatastore.getAll();
    });
    return propertyToReturn;
  }

  async getPropertiesForCurrentUserByCommunityId(communityId: string, userId: string): Promise<PropertyDataStructure[]> {
    let propertyToReturn: PropertyDataStructure[];
    await this.withDatastore(async (_passport, datastore) => {
      propertyToReturn = await datastore.propertyDatastore.getPropertiesForCurrentUserByCommunityId(communityId, userId);
    });
    return propertyToReturn;
  }
  
  async getPropertyByIdWithCommunityOwner(propertyId: string): Promise<PropertyDataStructure> {
    let propertyToReturn: PropertyDataStructure;
    await this.withDatastore(async (_passport, datastore) => {
      propertyToReturn = await datastore.propertyDatastore.getPropertyByIdWithCommunityOwner(propertyId);
    });
    return propertyToReturn;
  }

  async getPropertyById(propertyId: string): Promise<PropertyDataStructure> {
    let propertyToReturn: PropertyDataStructure;
    await this.withDatastore(async (_passport, datastore) => {
      propertyToReturn = await datastore.propertyDatastore.findOneById(propertyId);
    });
    return propertyToReturn;
  }

}
