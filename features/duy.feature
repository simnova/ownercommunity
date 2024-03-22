Feature: Manage Community
  Scenario: Create a new community
    Given DuyTheOwner registers with Owner Community
    When he creates a new community named TestCommunity
    And he should be the admin member of TestCommunity
    
  Scenario: Create a new member
    Given DuyTheOwner2 is the admin member of TestCommunity
    When he adds a new member named DuyTheMember to TestCommunity
    Then DuyTheMember should be the member of TestCommunity