Feature: Create Member

  Scenario: Create a new member
    Given DuyTheOwner2 is the admin member of community TestCommunity2
    When DuyTheOwner2 adds a new member named DuyTheMember to TestCommunity2
    Then DuyTheMember should be the member of TestCommunity2