Feature: Create a service ticket

Background: 
  Given OwenTheOwner creates Atlantis community
  And he creates CommunityManager role in Atlantis community with following permissions:
    | communityPermissions      | canManageRolesAndPermissions, canManageSiteContent, canManageMembers |
    | serviceTicketPermissions  | canManageTickets |
    | servicePermissions        | canManageServices |
  And he creates Member role in Atlantis community with following permissions:
    | serviceTicketPermissions  | canCreateTickets |
  And he creates MaintenancePerson role in Atlantis community with following permissions:
    | serviceTicketPermissions  | canWorkOnTickets |

@Todo
  Scenario: Member creates a service ticket for their property
    Given MikeTheMember is a member of the Atlantis community
    And he has a Member role
    And he has a ABC property in the Atlantis community
    When he creates a service ticket for ABC property
    And he advances the service ticket from DRAFT to SUBMITTED
    Then the service ticket is created for ABC property
    And the service ticket status is updated to SUBMITTED

@Todo
  Scenario: Member creates a service ticket for a property not owned by them
    Given WendyTheMember is a member of the Atlantis community
    And she has a Member role
    And she has a DEF property in the Atlantis community
    When she creates a service ticket for ABC property not owned by her
    And she advances the service ticket from DRAFT to SUBMITTED
    Then the service ticket is not created for ABC property
    And the service ticket status is not updated to SUBMITTED


@Todo
  Scenario: CommunityManager creates a service ticket for the property
    Given CamellaTheCommunityManager is a community manager at the Atlantis community
    And she has a CommunityManager role
    And she does not have any property in the Atlantis community
    When she creates a service ticket for DEF property
    And she advances the service ticket from DRAFT to SUBMITTED
    Then the service ticket is created for DEF property
    And the service ticket status is updated to SUBMITTED

@Todo
  Scenario: CommunityManager assign the service ticket to MaintenancePerson
    Given CamellaTheCommunityManager is a community manager at the Atlantis community
    And she has a CommunityManager role
    When she assigned the SUBMITTED service ticket to MaddyTheMaintenancePerson
    Then the service ticket status is updated to ASSIGNED

