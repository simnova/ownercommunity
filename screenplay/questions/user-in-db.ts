import { Question } from "@serenity-js/core";
import { UserProps } from "../../app/domain/contexts/user/user";
import { InteractWithTheDomain } from "../abilities/domain/interact-with-the-domain";


export const UserInDb = async (firstName: string, lastName: string) => Question.about(`read ${firstName} ${lastName} user`, async (actor) => {
  let user: UserProps;
  await InteractWithTheDomain.asReadOnly().readUserDb(async (db) => {
    const users = db.getAll();
    user = (users).find((u) => u.firstName === firstName && u.lastName === lastName); // Duy - should find another way to find user
  });
  return user;
});