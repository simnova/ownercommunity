import { Task } from "@serenity-js/core";
import { CreateMemberInDb } from "../interactions/create-member-in-db";
import { Ensure, isPresent } from "@serenity-js/assertions";
import { MemberInDb } from "../questions/member-in-db";


export const CreateMember = ({
    inCommunity: (communityName: string) => ({
        asNewMemberNamed: (memberName: string) => Task.where(`#actor creates ${memberName} member in ${communityName} community`,                
           CreateMemberInDb(memberName, communityName),
           Ensure.eventually(MemberInDb(memberName), isPresent())
        ),
    }),
})