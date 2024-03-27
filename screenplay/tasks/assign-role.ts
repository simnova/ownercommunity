import { Actor, Task } from "@serenity-js/core";
import { AssignRoleToMember } from "../interactions/assign-role-to-member";
import { Ensure, isPresent } from "@serenity-js/assertions";
import { RoleForCommunityInDb } from "../questions/role-for-community-in-db";
import { MemberInDb } from "../questions/member-in-db";


export const AssignRole = ({
  named: (roleName: string) => ({
    toMember: (memberName: string) => ({
      inCommunity: (communityName: string) =>Task.where(`#actor assigns ${roleName} role to ${memberName} in ${communityName} community`,
        // Add interaction to assign role to member in community
        AssignRoleToMember(roleName, memberName, communityName),
        Ensure.eventually(MemberInDb(memberName), isPresent())
      )
    })
  })
})
