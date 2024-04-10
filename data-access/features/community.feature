Feature: Create a new community

  Scenario: Create a new community
    Given OctaviaTheOwner registers with Owner Community
    When she creates a new community called MyCommunity
    Then she should see that the MyCommunity community was created by her
    And she is a member of MyCommunity
    And her member role is admin
