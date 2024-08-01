import { Question } from '@serenity-js/core/lib/screenplay';
import { InteractWithTheDomain } from '../abilities/domain/interact-with-the-domain';
import { ServiceTicketV1Props } from '../../src/app/domain/contexts/cases/service-ticket/v1/service-ticket';

export const ServiceTicketInDb = async (serviceTicketTitle: string) => Question.about(`read ${serviceTicketTitle} service ticket`, async (_actor) => {
   let serviceTicket: ServiceTicketV1Props;
   await InteractWithTheDomain.asReadOnly().readServiceTicketDb(async (db) => {
    serviceTicket = (db.getAll()).find((t) => t.title === serviceTicketTitle);
   });
   return serviceTicket;
});