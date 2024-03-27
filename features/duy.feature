Feature: Manage Community

  Scenario: Create a new community
    Given DuyTheOwner registers with Owner Community
    When he creates a new community named TestCommunity
    And he should be the admin member of TestCommunity

  Scenario: Create a new member
    Given DuyTheOwner2 is the admin member of TestCommunity2
    When he adds a new member named DuyTheMember to TestCommunity2
    Then DuyTheMember should be the member of TestCommunity2

  Scenario: Assign a role to a member
    Given DuyTheOwner3 is the admin member of TestCommunity3
    When he adds a new member named DuyTheMember3 to TestCommunity3
    And he assigns admin role to DuyTheMember3 in TestCommunity3
    Then DuyTheMember3 should have the admin role in TestCommunity3