import { Question } from '@serenity-js/core/lib/screenplay';
import { InteractWithTheDomain } from '../abilities/domain/interact-with-the-domain';
import { PropertyProps } from '../../src/app/domain/contexts/property/property';

export const PropertyInDb = async (propertyName: string) => Question.about(`read ${propertyName} property`, async (actor) => {
   let property: PropertyProps;
   await InteractWithTheDomain.asReadOnly().readPropertyDb(async (db) => {
      property = (db.getAll()).find((p) => p.propertyName === propertyName);
   });
   return property;
});