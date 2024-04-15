Feature: Create a new property

  Scenario: Create a new property
    Given OmarTheOwner registers with Owner Community
    And he is a member of a community named MyCommunity
    When he creates the property Pavilion in community MyCommunity
    Then the property Pavilion created by him exists in community MyCommunity
