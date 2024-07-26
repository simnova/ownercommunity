import { AppContext } from '../../init/app-context-builder';
import { PropertyModel } from '../../external-dependencies/datastore';
import { PropertyUnitOfWork } from '../../external-dependencies/domain';
import { PropertyBlobApi, PropertyBlobApiImpl } from './property.blob';
import { PropertyDataApi, PropertyDataApiImpl } from './property.data';
import { PropertyDomainApi, PropertyDomainApiImpl } from './property.domain';
import { PropertySearchApi, PropertySearchApiImpl } from './property.search';
import { PropertyMapsApi, PropertyMapsApiImpl } from './property.maps';

export interface PropertyApi { 
  blobApi: PropertyBlobApi,
  dataApi: PropertyDataApi,
  domainApi: PropertyDomainApi,
  searchApi: PropertySearchApi,
  mapApi: PropertyMapsApi,
}

export class PropertyApiImpl implements PropertyApi {
  blobApi: PropertyBlobApi;
  dataApi: PropertyDataApi;
  domainApi: PropertyDomainApi;
  searchApi: PropertySearchApi;
  mapApi: PropertyMapsApi;

  constructor(context: AppContext) {
    this.blobApi = new PropertyBlobApiImpl({ context });
    this.dataApi = new PropertyDataApiImpl({ modelOrCollection: PropertyModel, context });
    this.domainApi = new PropertyDomainApiImpl({ unitOfWork: PropertyUnitOfWork, context });
    this.searchApi = new PropertySearchApiImpl({ context });
    this.mapApi = new PropertyMapsApiImpl({ context });
  }

}