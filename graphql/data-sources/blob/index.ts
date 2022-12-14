import { Communities } from './communities';
import { Members } from './members';
import { Properties } from './properties';
import { Services } from '../../../infrastructure/services';

const services = new Services();

export const Blob = {
  communityBlobAPI: new Communities(services.blobStorage),
  memberBlobAPI: new Members(services.blobStorage),
  propertyBlobAPI: new Properties(services.blobStorage),
};
