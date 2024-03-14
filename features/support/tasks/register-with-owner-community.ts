import { Actor, Interaction, Task } from '@serenity-js/core/lib/screenplay';
import { getOrCreateUserForActor } from '../helpers/get-or-create-user-for-actor';

export const RegisterWithOwnerCommunity = ({
    asNewUser: () => Task.where(`#actor registers as new user`,
      Interaction.where(`#actor creates user`, async (actor:Actor) => {
          await getOrCreateUserForActor(actor);
      })
    ),
});

