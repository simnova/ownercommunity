Feature: Create Community

  Scenario: Create a new community
    Given OctaviaTheOwner registers with Owner Community
    When OctaviaTheOwner creates a new community named MyCommunity
    Then she should see that the MyCommunity community was created by her
    And she is a member of MyCommunity
    And OctaviaTheOwner should be the admin member of MyCommunity
