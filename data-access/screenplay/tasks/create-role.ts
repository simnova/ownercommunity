import { Task } from '@serenity-js/core/lib/screenplay';
import { CreateRoleInDb } from '../interactions/create-role-in-db';

export const CreateRole = ({
    inCommunity: (communityName: string) => ({
        asNewRoleNamed: (roleName: string) => ({
            withPermissions: (permissions: Record<string, string>) => Task.where(`#actor creates ${roleName} role in ${communityName} community`,                
                CreateRoleInDb(communityName, roleName, permissions),
            ),
        }),
    }),
});

