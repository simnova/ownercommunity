Feature: Create Property

  Scenario: Create a new property
    Given OmarTheOwner registers with Owner Community
    And OmarTheOwner is a member of a community named MyCommunity
    When OmarTheOwner creates a property named Pavilion in community MyCommunity
    Then the property Pavilion created by him exists in community MyCommunity

  Scenario: Property in a community should not in another community
    Given OmarTheOwner is the admin member of community Cheltenham
    And SharaTheOwner is the admin member of community Philadelphia
    When OmarTheOwner creates a property named Pavilion in community Cheltenham
    Then the property Pavilion created by him does not exist in Philadelphia

