Feature: Create a new community
  Scenario: Create a new community
    Given DuyTheOwner registers with Owner Community
    When he creates a new community named TestCommunity
    And he should be the admin member of TestCommunity
    