import { Question } from '@serenity-js/core/lib/screenplay';
import { InteractWithTheDomain } from '../abilities/domain/interact-with-the-domain';
import { ServiceTicketProps } from '../../src/app/domain/contexts/service-ticket/service-ticket';

export const ServiceTicketInDb = async (serviceTicketTitle: string) => Question.about(`read ${serviceTicketTitle} service ticket`, async (_actor) => {
   let serviceTicket: ServiceTicketProps;
   await InteractWithTheDomain.asReadOnly().readServiceTicketDb(async (db) => {
    serviceTicket = (db.getAll()).find((t) => t.title === serviceTicketTitle);
   });
   return serviceTicket;
});