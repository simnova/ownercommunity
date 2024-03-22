Feature: Create a new property

  Scenario: Create a new property
    Given OmarTheOwner registers with Owner Community
    And he is a member of a community
    When he creates the property Pavilion in the community
    Then the property Pavilion created by him exists in the community
