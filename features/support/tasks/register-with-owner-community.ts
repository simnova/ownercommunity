import { Task } from '@serenity-js/core/lib/screenplay';
import { CreateUserInDb } from '../interactions/create-user-in-db';

export const RegisterWithOwnerCommunity = ({
    asNewUser: () => Task.where(`#actor registers as new user`,
      CreateUserInDb(),
    ),
});

