import { EntityProps } from "../../../../../seedwork/domain-seedwork/entity";
import { ReadOnlyMemoryStore } from "../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-store";
import { Fields, FindQueries } from "../../../../app/infrastructure-services/datastore/_base";

export class BaseMemoryDatastore<PropType extends EntityProps> implements FindQueries<PropType> {
  constructor(private readonly memoryStore: ReadOnlyMemoryStore<PropType>) {
  }

  async findOneById(id: string): Promise<PropType> {
    return this.memoryStore.get(id);
  }

  async findManyByIds(ids: string[]): Promise<PropType[]> {
    return (await this.memoryStore.getAll())?.filter(r => ids.includes(r.id));
  }

  async findByFields(conditions: Fields): Promise<PropType[]> {
    return this.filterArrayByNestedFields(conditions);
  }

  private async filterArrayByNestedFields(conditions: Fields): Promise<PropType[]> {
    return JSON.parse(JSON.stringify(await this.memoryStore.getAll())).filter(item => {
        for (const key in conditions) {
            if (conditions.hasOwnProperty(key)) {
                const conditionValue = conditions[key];
                const nestedKeys = key.split('.'); // Split nested keys by dot notation

                // Traverse nested keys to find the value
                let nestedObject = item;
                for (const nestedKey of nestedKeys) {
                    nestedObject = nestedObject[nestedKey](); // Use getter method to access property
                }

                // Compare nested value with condition value
                if (Array.isArray(conditionValue)) {
                    // If condition value is an array, check if nested value is in the array
                    if (!conditionValue.includes(nestedObject)) {
                        return false;
                    }
                } else {
                    // Otherwise, directly compare nested value with condition value
                    if (nestedObject !== conditionValue) {
                        return false;
                    }
                }
            }
        }
        return true; // All conditions passed
    });
  }
}
