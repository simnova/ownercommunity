import { Question } from '@serenity-js/core/lib/screenplay';
import { InteractWithTheDomain } from '../abilities/domain/interact-with-the-domain';
import { PropertyProps } from '../../src/app/domain/contexts/property/property';

export const PropertyInCommunityInDb = async (communityName: string, propertyName:string) => Question.about(`read ${propertyName} property in ${communityName} community`, async (actor) => {
   let property: PropertyProps;
   await InteractWithTheDomain.asReadOnly().readPropertyDb(async (db) => {
      property = (await db.getAll()).find((p) => p.community.name === communityName && p.propertyName === propertyName);
   });
    return property;
 });
    
