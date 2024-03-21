Feature: Create a new property

  Scenario: Create a new property
      The Given step definition is in file community.steps.ts
    Given OmarTheOwner has a registered account in OwnerCommunity
    And he is a member of a community
    When he creates the property Pavilion in the community
    Then the property Pavilion created by him exists in the community
