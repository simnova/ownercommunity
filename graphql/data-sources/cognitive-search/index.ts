import { Properties } from './properties';
import { ServiceTickets } from './service-tickets';
import { Services } from '../../../infrastructure/services';

const services = new Services();

export const CognitiveSearch = {
  propertySearchApi: new Properties(services.cognitiveSearch),
  serviceTicketsSearchApi: new ServiceTickets(services.cognitiveSearch),
};

export type CognitiveSearchType = typeof CognitiveSearch;
