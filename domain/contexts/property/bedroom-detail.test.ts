import { PropertyPermissions } from "./property-permissions.spec";
import { DomainExecutionContext } from "../context";
import { Passport } from "../iam/passport";
import { PropertyVisa } from "../iam/property-visa";
import { BedroomDetail, BedroomDetailProps } from "./bedroom-detail";

const mockPropertyVisa = jest.fn((mockPermissions: PropertyPermissions) => {
    return {
        determineIf: jest.fn((func:((permissions:PropertyPermissions) => boolean)) => {
            return func(mockPermissions);
        })
    };
});
const commonRoomNameTestCases = (describeText: string, inputBedroomDetail: BedroomDetail) => {
    describe(describeText, () => {
        const creatingBedroomDetail = inputBedroomDetail;
        it('Then I expect system to update roomName with a string of length 1 char', () => {
            // Arrange
            const roomName = 'x'.repeat(1);
            // Act
            const settingValidRoomName = () => {
                creatingBedroomDetail.RoomName = roomName;
            }
            // Assert
            expect(settingValidRoomName).not.toThrow();
        });
        it('Then I expect system to update roomName with a string of length 100 chars', () => {
            // Arrange
            const roomName = 'x'.repeat(100);
            // Act
            const settingValidRoomName = () => {
                creatingBedroomDetail.RoomName = roomName;
            }
            // Assert
            expect(settingValidRoomName).not.toThrow();
        });
        it('Then I expect system to throw \'Too long\' error when trying to update roomName with a string of length 101 chars', () => {
            // Arrange
            const roomName = 'x'.repeat(101);
            // Act
            const settingInvalidRoomName = () => {
                creatingBedroomDetail.RoomName = roomName;
            }
            // Assert
            expect(settingInvalidRoomName).toThrow('Too long');
        });
        it('Then I expect system to throw \'Wrong raw value type\' error when trying to update roomName with a null value', () => {
            // Arrange
            const roomName = null;
            // Act
            const settingInvalidRoomName = () => {
                creatingBedroomDetail.RoomName = roomName;
            }
            // Assert
            expect(settingInvalidRoomName).toThrow('Wrong raw value type');
        });
        it('Then I expect system to throw \'Wrong raw value type\' error when trying to update roomName with an undefined value', () => {
            // Arrange
            const roomName = undefined;
            // Act
            const settingInvalidRoomName = () => {
                creatingBedroomDetail.RoomName = roomName;
            }
            // Assert
            expect(settingInvalidRoomName).toThrow('Wrong raw value type');
        });
    });
}

describe('Feature::domain.contexts.property.bedroom-detail', () => {
    describe('Given an empty Bedroom Detail', () => {
        const emptyBedroomDetailProps = jest.mocked({} as BedroomDetailProps);
        describe('When updating the roomName', () => {
            describe('And the user has \'canManageProperties\' permissions', () => {
                const visa = mockPropertyVisa({
                    canManageProperties: true,
                    canEditOwnProperty: false,
                    isEditingOwnProperty: false,
                    isSystemAccount: false
                });
                const creatingBedroomDetail = new BedroomDetail(emptyBedroomDetailProps, visa);
                it('Then I expect system to update roomName with a string of length 1 char', () => {
                    // Arrange
                    const roomName = 'x'.repeat(1);
                    // Act
                    const settingValidRoomName = () => {
                        creatingBedroomDetail.RoomName = roomName;
                    }
                    // Assert
                    expect(settingValidRoomName).not.toThrow();
                });
                it('Then I expect system to update roomName with a string of length 100 chars', () => {
                    // Arrange
                    const roomName = 'x'.repeat(100);
                    // Act
                    const settingValidRoomName = () => {
                        creatingBedroomDetail.RoomName = roomName;
                    }
                    // Assert
                    expect(settingValidRoomName).not.toThrow();
                });
                it('Then I expect system to throw \'Too long\' error when trying to update roomName with a string of length 101 chars', () => {
                    // Arrange
                    const roomName = 'x'.repeat(101);
                    // Act
                    const settingInvalidRoomName = () => {
                        creatingBedroomDetail.RoomName = roomName;
                    }
                    // Assert
                    expect(settingInvalidRoomName).toThrow('Too long');
                });
                it('Then I expect system to throw \'Wrong raw value type\' error when trying to update roomName with a null value', () => {
                    // Arrange
                    const roomName = null;
                    // Act
                    const settingInvalidRoomName = () => {
                        creatingBedroomDetail.RoomName = roomName;
                    }
                    // Assert
                    expect(settingInvalidRoomName).toThrow('Wrong raw value type');
                });
                it('Then I expect system to throw \'Wrong raw value type\' error when trying to update roomName with an undefined value', () => {
                    // Arrange
                    const roomName = undefined;
                    // Act
                    const settingInvalidRoomName = () => {
                        creatingBedroomDetail.RoomName = roomName;
                    }
                    // Assert
                    expect(settingInvalidRoomName).toThrow('Wrong raw value type');
                });
            });
            commonRoomNameTestCases('And the user has \'canEditOwnProperty & isEditingOwnProperty\' permissions',new BedroomDetail(emptyBedroomDetailProps, mockPropertyVisa({
                canManageProperties: false,
                canEditOwnProperty: true,
                isEditingOwnProperty: true,
                isSystemAccount: false
            })))
        });
    });
});
    

    
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