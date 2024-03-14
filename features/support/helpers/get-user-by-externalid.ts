import { UserProps } from "../../../domain/contexts/user/user";
import { InteractWithTheDomain } from "../domain/abilities/interactWithTheDomain";

export async function GetUserByExternalId(externalId: string): Promise<UserProps> {
  let user: UserProps;
  await InteractWithTheDomain.asSystem().readUserDb(async (db) => {
    user = db?.getAll()?.find(user => user.externalId === externalId);
  });
  return user;
}
