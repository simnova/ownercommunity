import { Actor, Interaction } from "@serenity-js/core";
import { InteractWithTheDomain } from "../abilities/domain/interact-with-the-domain";
import { CommunityInDb } from "../questions/community-in-db";
import { CommunityEntityReference } from "../../app/core/domain/contexts/community/community";
import { PropertyInDb } from "../questions/property-in-db";
import { PropertyEntityReference } from "../../app/core/domain/contexts/property/property";
import { MemberInDb } from "../questions/member-in-db";
import { MemberEntityReference } from "../../app/core/domain/contexts/community/member";


export const CreateServiceTicketInDb = (
  serviceTicketTitle: string,
  description: string,
  communityName: string,
  propertyName: string,
  requestorName?: string
) => {
  
  return Interaction.where(`#actor creates service ticket`, async (actor:Actor) => {
    const community = await (await CommunityInDb(communityName)).answeredBy(actor) as CommunityEntityReference;
    const property = await (await PropertyInDb(propertyName)).answeredBy(actor) as unknown as PropertyEntityReference; // [MG-TBD] - remove unknown
    let member: MemberEntityReference;

    if (requestorName) {
      member = await (await MemberInDb(requestorName)).answeredBy(actor) as unknown as MemberEntityReference; 
    } else {
      member = await (await MemberInDb(actor.name)).answeredBy(actor) as unknown as MemberEntityReference; 
    }

    (await (await InteractWithTheDomain.asUser(actor)).asMemberOf(communityName)).actOnServiceTicket(async (repo) => {
      const newServiceTicket = await repo.getNewInstance(serviceTicketTitle, description, community, property, member);
      await repo.save(newServiceTicket);
    });
  });
};