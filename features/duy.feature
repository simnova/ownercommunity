Feature: Manage Community


  Scenario: Create a new community
    Given DuyTheOwner registers with Owner Community
    When he creates a new community named TestCommunity
    And he should be the admin member of TestCommunity

  Scenario: Create a new member
    Given DuyTheOwner2 is the admin member of TestCommunity2
    When he adds a new member named DuyTheMember to TestCommunity2
    Then DuyTheMember should be the member of TestCommunity2

  Scenario: Assign admin role to a member
    Given DuyTheOwner3 is the admin member of TestCommunity3
    When he adds a new member named DuyTheMember3 to TestCommunity3
    And he assigns admin role to DuyTheMember3 in TestCommunity3
    Then DuyTheMember3 should have the admin role in TestCommunity3

  Scenario: Assign a member role to a member
    Given DuyTheOwner4 is the admin member of TestCommunity4
    When he adds a new member named DuyTheMember4 to TestCommunity4
    And he creates PropertyOwner role in TestCommunity4 community with following permissions:
      | propertyPermissions      | canManageProperties, canEditOwnProperty |
      | serviceTicketPermissions  | canManageTickets |
      | servicePermissions        | canManageServices |
    And he assigns PropertyOwner role to DuyTheMember4 in TestCommunity4
    Then DuyTheMember4 should have the PropertyOwner role in TestCommunity4
  
  @wip
  Scenario: Add account to a member
    Given DuyTheUser5 registers with Owner Community
    And DuyTheOwner5 is the admin member of TestCommunity5
    When he adds a new member named DuyTheMember5 to TestCommunity5    
    And he creates an account with first name Duy, last name Nguyen for DuyTheMember5 using userId of DuyTheUser5 in TestCommunity5 
    Then DuyTheUser5 should be a member of TestCommunity5
