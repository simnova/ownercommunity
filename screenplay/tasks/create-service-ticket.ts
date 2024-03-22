import { Task } from '@serenity-js/core/lib/screenplay';
import { CreateServiceTicketInDb } from '../interactions/create-service-ticket-in-db';
import { Ensure, isPresent } from '@serenity-js/assertions';
import { ServiceTicketInDb } from '../questions/service-ticket-in-db';

export const CreateServiceTicket = ({
  inCommunity: (communityName: string) => ({
    forProperty: (propertyName: string) => ({
      forRequestor: (requestorName: string) => ({
        asNewServiceTicketNamed: (serviceTicketTitle: string, description: string) => Task.where(`#actor creates ${serviceTicketTitle} service ticket in ${communityName} community for ${propertyName} property for ${requestorName} member`,                
          CreateServiceTicketInDb(serviceTicketTitle, description, communityName, propertyName, requestorName),
          Ensure.eventually(ServiceTicketInDb(serviceTicketTitle), isPresent())
        ),
      })
    })
  })
})