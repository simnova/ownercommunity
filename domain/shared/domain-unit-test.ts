
// import { PropertyPermissions } from "./property-permissions.spec";
// import { DomainExecutionContext } from "../context";
// import { Passport } from "../iam/passport";
// import { PropertyVisa } from "../iam/property-visa";
// import { BedroomDetail, BedroomDetailProps } from "./bedroom-detail";
import _ from 'underscore';
import {expect, jest, test} from '@jest/globals';

// const mockVisa = jest.fn((mockPermissions: PropertyPermissions) => {
//     return {
//         determineIf: jest.fn((func:((permissions:PropertyPermissions) => boolean)) => {
//             return func(mockPermissions);
//         })
//     };
// });

// const mockVisa = jest.fn(<PermissionType>(mockPermissions: PermissionType) => {
//     return {
//         determineIf: jest.fn((func:((permissions:PermissionType) => boolean)) => {
//             return func(mockPermissions);
//         })
//     };
// });

// const mockPropertyVisa = jest.fn(<T extends PropertyPermissions>(
//     mockPermissions: T
//   ) => ({
//     determineIf: jest.fn((func: (permissions: T) => boolean) => func(mockPermissions)),
//   }));

const runVOStringTestCases = (
    fieldName: string,
    testDescription: string, 
    testAct: (val: string) => any,
    minLength: number | null,
    maxLength: number | null,
    canBeNull: boolean,
    camBeUndefined: boolean
) => {
    describe(testDescription, () => {
        // min length
        const defaultMinLength = 0;
        it(`Then I expect system to update ${fieldName} with a string of length ${minLength || defaultMinLength} chars`, () => {
            // Arrange
            const val = 'x'.repeat(minLength || defaultMinLength);
            // Act
            const settingValue = () => {
                return testAct(val);
            };
            // Assert
            expect((settingValue)).not.toThrow();
        });
        if(minLength && minLength > 0){
            it(`Then I expect system to throw \'Too short\' error when trying to update ${fieldName} with a string of length ${minLength-1} chars`, () => {
                // Arrange
                const val = 'x'.repeat(minLength-1);
                // Act
                const settingValue = () => {
                    return testAct(val);
                };
                // Assert
                expect(settingValue).toThrow('Too short');
            });
        }

        // max length
        const defaultMaxLength = 100;
        it(`Then I expect system to update ${fieldName} with a string of length ${maxLength || defaultMaxLength} chars`, () => {
            // Arrange
            const val = 'x'.repeat(maxLength || defaultMaxLength);
            // Act
            const settingValue = () => {
                return testAct(val);
            };
            // Assert
            expect(settingValue).not.toThrow();
        });
        if(maxLength){
            it(`Then I expect system to throw \'Too long\' error when trying to update ${fieldName} with a string of length ${maxLength+1} chars`, () => {
                // Arrange
                const val = 'x'.repeat(maxLength+1);
                // Act
                const settingValue = () => {
                    return testAct(val);
                };
                // Assert
                expect(settingValue).toThrow('Too long');
            });
        }

        // canBeNull
        if(canBeNull === true){
            it(`Then I expect system to update ${fieldName} with a null value`, () => {
                // Arrange
                const val = null;
                // Act
                const settingValue = () => {
                    return testAct(val);
                };
                // Assert
                expect(settingValue).not.toThrow();
            });
        }else{
            it(`Then I expect system to throw \'Wrong raw value type\' error when trying to update ${fieldName} with a null value`, () => {
                // Arrange
                const val = null;
                // Act
                const settingValue = () => {
                    return testAct(val);
                };
                // Assert
                expect(settingValue).toThrow('Wrong raw value type');
            });
        }

        // camBeUndefined
        if(camBeUndefined === true){
            it(`Then I expect system to update ${fieldName} with an undefined value`, () => {
                // Arrange
                const val = undefined;
                // Act
                const settingValue = () => {
                    return testAct(val);
                };
                // Assert
                expect(settingValue).not.toThrow();
            });
        }else{
            it(`Then I expect system to throw \'Wrong raw value type\' error when trying to update ${fieldName} with an undefined value`, () => {
                // Arrange
                const val = undefined;
                // Act
                const settingValue = () => {
                    return testAct(val);
                };
                // Assert
                expect(settingValue).toThrow('Wrong raw value type');
            });
        }
    });
}

    

//////////// helper functions //////////////

function getPermissionSetDescription(permissionSet: any){
    // console.log('getPermissionSetDescription',permissionSet);
    const keys = Object.keys(permissionSet).filter((key) => permissionSet[key] === true).join(' & ') || 'no';
    return keys + ' permissions';
}


function generateInvalidPermissionSets<PermissionType>(validPermissionSets: PermissionType[]): PermissionType[]{
    // no valid permission sets
    if(validPermissionSets.length === 0){
        return [];
    }
    // considering the first valid permission set as reference
    const referencePermissionSet = validPermissionSets[0];
    // no permission properties in referencePermissionSet
    if(_.isEmpty(referencePermissionSet)){
        return [];
    }
    let allPermissionSets = generateCombinations(referencePermissionSet);
    // console.log('allPermissionSets',allPermissionSets);
    const validPermissionCombinations = _.flatten(validPermissionSets.map((permissionSet) => {
        return generateCombinationsForNullProperties(permissionSet);
    }));
    // console.log('validPermissionCombinations',validPermissionCombinations);
    
    // remove validPermissionCombinations from allPermissionSets
    let invalidPermissionSets = [];
    allPermissionSets.map((permissionSet) => {
        let isInvalid = true;
        validPermissionCombinations.map((validPermissionSet) => {
            if(_.isEqual(permissionSet, validPermissionSet)){
                isInvalid = false;
            }
        });
        if(isInvalid === true){
            invalidPermissionSets.push(permissionSet);
        }
    });
    // console.log('invalidPermissionSets',invalidPermissionSets);
    return invalidPermissionSets;
}


function generateCombinations(obj) {
    const keys = Object.keys(obj);
  
    // Helper function to recursively generate combinations
    function generate(index, currentCombination) {
      if (index === keys.length) {
        combinations.push({ ...currentCombination });
        return;
      }
  
      // Generate combinations with the current key set to true
      currentCombination[keys[index]] = true;
      generate(index + 1, currentCombination);
  
      // Generate combinations with the current key set to false
      currentCombination[keys[index]] = false;
      generate(index + 1, currentCombination);
    }
  
    const combinations = [];
    generate(0, {});
  
    return combinations;
}


function generateCombinationsForNullProperties(obj) {
    const keys = Object.keys(obj).filter((key) => obj[key] === null);

    // Helper function to recursively generate combinations
    function generate(index, currentCombination) {
        if (index === keys.length) {
        combinations.push({ ...currentCombination });
        return;
        }

        // Generate combinations with the current key set to true
        currentCombination[keys[index]] = true;
        generate(index + 1, currentCombination);

        // Generate combinations with the current key set to false
        currentCombination[keys[index]] = false;
        generate(index + 1, currentCombination);
    }

    const combinations = [];
    generate(0, obj);

    return combinations;
}


