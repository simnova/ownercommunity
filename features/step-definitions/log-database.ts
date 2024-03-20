import { InteractWithTheDomain } from "../../screenplay/abilities/domain/interact-with-the-domain";

export const LogDatabase = async () => {
  console.log('===> Memory Database ************');
  await InteractWithTheDomain.asReadOnly().readCommunityDb(async (db) => {
    console.log('===> database > community : ', JSON.stringify(db));
  });

  await InteractWithTheDomain.asReadOnly().readUserDb(async (db) => {
    console.log('===> database > user : ', JSON.stringify(db));
  });

  await InteractWithTheDomain.asReadOnly().readRoleDb(async (db) => {
    console.log('===> database > role : ', JSON.stringify(db));
  });

  await InteractWithTheDomain.asReadOnly().readMemberDb(async (db) => {
    console.log('===> database > member : ', JSON.stringify(db));
  });
  await InteractWithTheDomain.asReadOnly().readPropertyDb(async (db) => {
    console.log('===> database > property : ', JSON.stringify(db));
  });

  await InteractWithTheDomain.asReadOnly().logSearchDatabase();
}