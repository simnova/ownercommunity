import { Actor, Question, Task, notes } from '@serenity-js/core/lib/screenplay';
import { CommunityProps } from '../../../domain/contexts/community/community';
import { InteractWithTheDomain } from '../domain/abilities/interactWithTheDomain';

const GetCommunityInfo = (communityName: string) =>
    Question.about('User list contains user', async (actor: Actor) => {
      let community: CommunityProps;
      (await (await InteractWithTheDomain.asUser(actor)).asMemberOf(communityName)).readCommunityDb(async (db) => {
        community = (await db?.getAll())?.find(c => c.name === communityName);
      });
       return community;
    });


export const CreateRole = ({
    inCommunity: (communityName: string) => ({
        asNewRole: (roleName: string) => ({
            withPermissions: (permissions: string[]) => Task.where(`#actor creates ${roleName} role in ${communityName} community`,
                notes().set('community', GetCommunityInfo(communityName)),
                //     CreateRole(roleName, communityName),
                /*
                 Interaction.where(`#actor creates user`, async (actor:Actor) => {
                    await InteractWithTheDomain.as(actor).actOnRole(async (repo) => {
                    const role = await repo.getNewInstance(name, community);
                    console.log('===>role in db: ', role);
                    await repo.save(role);
                    });
                })
                 */
            ),
        }),
    }),
});

