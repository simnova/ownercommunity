import { Context } from '../../context';
import { Properties } from './properties';
import { ServiceTickets } from './service-tickets';

// export const CognitiveSearch = {
//   propertySearchApi: new Properties({ context: {} as Context }),
//   serviceTicketsSearchApi: new ServiceTickets({ context: {} as Context }),
// };

export {
  Properties as PropertySearchAPI,
  ServiceTickets as ServiceTicketsSearchAPI
}