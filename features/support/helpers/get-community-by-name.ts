import { CommunityEntityReference } from "../../../domain/contexts/community/community";
import { InteractWithTheDomain } from "../domain/abilities/interactWithTheDomain";

export async function getCommunityByName(communityName: string): Promise<CommunityEntityReference> {
  let community: CommunityEntityReference;
  await InteractWithTheDomain.asSystem().readCommunityDb(async (db) => {
    community = db?.getAll()?.find(c => c.name === communityName);
  });
  return community;
}
