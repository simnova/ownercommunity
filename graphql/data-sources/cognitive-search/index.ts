/** @format */

import { Properties } from './properties';
import { ServiceTickets } from './service-tickets';
export const CognitiveSearch = {
  propertySearchApi: new Properties(),
  serviceTicketsSearchApi: new ServiceTickets(),
};

export type CognitiveSearchType = typeof CognitiveSearch;
