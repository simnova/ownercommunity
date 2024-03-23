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
  Scenario: Member creates a service ticket for own property
    Given MikeTheMember is a Member of the Atlantis community
    And he has a ABC property in the Atlantis community
    When he creates a service ticket for ABC property
    And he advances the service ticket from DRAFT to SUBMITTED
    Then the service ticket is created for ABC property
    And the service ticket status is SUBMITTED

@Todo
  Scenario: Member creates a service ticket for a property not owned
    Given WendyTheMember is a Member of the Atlantis community
    And she has a DEF property in the Atlantis community
    When she creates a service ticket for ABC property not owned by her
    And she advances the service ticket from DRAFT to SUBMITTED
    Then the service ticket is not created for ABC property
    And the service ticket status is not SUBMITTED

@Todo
  Scenario: CommunityManager creates a service ticket for the property
    Given CamellaTheCommunityManager is a Community Manager at the Atlantis community
    And she does not have any property in the Atlantis community
    When she creates a service ticket for DEF property
    And she advances the service ticket from DRAFT to SUBMITTED
    Then the service ticket is created for DEF property
    And the service ticket status is SUBMITTED

@Todo
Scenario: Member saves service ticket in draft
    Given MikeTheMember is a Member of the Atlantis community
    And he has a ABC property in the Atlantis community
    When he creates a service ticket for ABC property
    And he saves the service ticket in DRAFT
    Then the service ticket is not created for ABC property
    And the service ticket status is DRAFT

@Todo
  Scenario: CommunityManager assign the service ticket to MaintenancePerson
    Given MikeTheMember is a Member of the Atlantis community
    And he has a ABC property in the Atlantis community
    And he creates a service ticket for ABC property
    And CamellaTheCommunityManager is a Community Manager at the Atlantis community
    And MaddyTheMaintenancePerson is a Maintenance Person at the Atlantis community
    And the service ticket status is SUBMITTED
    When she assigns the service ticket to MaddyTheMaintenancePerson
    And she advances the service ticket from SUBMITTED to ASSIGNED
    Then the service ticket status is ASSIGNED
    And the service ticket is assigned to MaddyTheMaintenancePerson

