import { Question } from "@serenity-js/core";
import { UserProps } from "../../src/app/domain/contexts/user/user";
import { InteractWithTheDomain } from "../abilities/domain/interact-with-the-domain";


export const UserInDb = async (externalId: string) => Question.about(`read user with external id ${externalId}`, async (actor) => {
  let user: UserProps;
  await InteractWithTheDomain.asReadOnly().readUserDb(async (db) => {
    const users = db.getAll();
    user = (users).find((u) => u.externalId === externalId); // Duy - should find another way to find user
  });
  return user;
});