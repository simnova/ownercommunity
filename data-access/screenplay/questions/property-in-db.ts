import { Question } from '@serenity-js/core/lib/screenplay';
import { InteractWithTheDomain } from '../abilities/domain/interact-with-the-domain';
import { PropertyProps } from '../../src/components/domain/contexts/property/property/property';

export const PropertyInDb = async (propertyName: string) => Question.about(`read ${propertyName} property`, async (actor) => {
   let property: PropertyProps;
   await InteractWithTheDomain.asReadOnly().readPropertyDb(async (db) => {
      property = (db.getAll()).find((p) => p.propertyName === propertyName);
   });
   return property;
});