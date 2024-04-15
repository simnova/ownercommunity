Feature: Create Community

  Scenario: Create a new community
    Given OctaviaTheOwner registers with Owner Community
    When OctaviaTheOwner creates a new community named MyCommunity
    Then she should see that the MyCommunity community was created by her
    And she is a member of MyCommunity
    And her member role is admin

   Scenario: Create a new community
    Given DuyTheOwner registers with Owner Community
    When DuyTheOwner creates a new community named TestCommunity
    And DuyTheOwner should be the admin member of TestCommunity