import { UserProps } from "../../../domain/contexts/user/user";
import { SystemExecutionContext } from "../../../domain/infrastructure/execution-context";
import { InteractWithTheDomain } from "../domain/abilities/interactWithTheDomain";

export async function GetUserByExternalId(externalId: string): Promise<UserProps> {
  let user: UserProps;
  await InteractWithTheDomain.using(SystemExecutionContext()).readUserDb(async (db) => {
    user = db?.getAll()?.find(user => user.externalId === externalId);
  });
  return user;
}
