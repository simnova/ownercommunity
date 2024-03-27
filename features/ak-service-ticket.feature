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

@dev-todo
  Scenario: Member creates a service ticket for own property
    Given MikeTheMember is assigned the Member role at the Atlantis community
    And MikeTheMember has a ABC property in the Atlantis community
    When MikeTheMember creates a service ticket for ABC property
    And MikeTheMember adds Title "Driveway is broken" in the service ticket
    And MikeTheMember adds details in the service ticket
    """
    Driveway is broken from both sides
    There are visible cracks on the concrete
    Need repair and fill up the cracks
    """
    And MikeTheMember advances the service ticket from DRAFT to SUBMITTED
    Then the service ticket is created for ABC property
    And the service ticket status is SUBMITTED

@dev-todo
  Rule: Members are not allowed to created service ticket for the property now owned by them 

  Scenario: Member creates a service ticket for a property not owned
    Given WendyTheMember is assigned the Member role at the Atlantis community
    And WendyTheMember has a DEF property in the Atlantis community
    When WendyTheMember creates a service ticket for ABC property not owned by her
    Then the service ticket is not created for ABC property
    And the service ticket status is not SUBMITTED

@dev-todo
  Scenario: CommunityManager creates a service ticket for the property
    Given CamellaTheCommunityManager is assigned the CommunityManager role at the Atlantis community
    And CamellaTheCommunityManager does not have any property in the Atlantis community
    When CamellaTheCommunityManager creates a service ticket for DEF property
    And CamellaTheCommunityManager adds Title "Lawn maintenance is required" in the service ticket
    And CamellaTheCommunityManager adds details in the service ticket
    """
    Lawn maintenance required outside the main enterance 
    removing debris and leaves, edging borders, mowing grass, 
    and cleanup.
    """
    And CamellaTheCommunityManager advances the service ticket from DRAFT to SUBMITTED
    Then the service ticket is created for DEF property
    And the service ticket status is SUBMITTED

@dev-todo
  Scenario: Member saves service ticket in draft
    Given MikeTheMember is assigned the Member role at the Atlantis community
    And MikeTheMember has a ABC property in the Atlantis community
    When MikeTheMember creates a service ticket for ABC property
    And he saves the service ticket in DRAFT
    Then the service ticket is not created for ABC property
    And the service ticket status is DRAFT

@dev-todo
  Scenario: Assign the service ticket to MaintenancePerson
    Given MikeTheMember is assigned the Member role at the Atlantis community
    And CamellaTheCommunityManager is assigned the CommunityManager role at the Atlantis community
    And MaddyTheMaintenancePerson is assigned the MaintenancePerson role at the Atlantis community
    And MikeTheMember has a ABC property in the Atlantis community
    And MikeTheMember creates a service ticket for ABC property
    And the service ticket status is SUBMITTED
    When CamellaTheCommunityManager assigns the service ticket to MaddyTheMaintenancePerson
    And CamellaTheCommunityManager advances the service ticket from SUBMITTED to ASSIGNED
    Then the service ticket status is ASSIGNED
    And the service ticket is assigned to MaddyTheMaintenancePerson

@dev-todo
  Scenario: Update the service ticket to InProgress
    Given MikeTheMember is assigned the Member role at the Atlantis community
    And CamellaTheCommunityManager is assigned the CommunityManager role at the Atlantis community
    And MaddyTheMaintenancePerson is assigned the MaintenancePerson role at the Atlantis community
    And MikeTheMember has a ABC property in the Atlantis community
    And MikeTheMember creates a service ticket for ABC property
    And MikeTheMember advances the service ticket from DRAFT to SUBMITTED
    And CamellaTheCommunityManager assigns the service ticket to MaddyTheMaintenancePerson
    And CamellaTheCommunityManager advances the service ticket from SUBMITTED to ASSIGNED
    When MaddyTheMaintenancePerson advances the service ticket from ASSIGNED to INPROGRESS
    Then the service ticket status is INPROGRESS

@dev-todo
  Scenario:  Update the service ticket to Complete
    Given CamellaTheCommunityManager is assigned the CommunityManager role at the Atlantis community
    And MaddyTheMaintenancePerson is assigned the MaintenancePerson role at the Atlantis community
    And CamellaTheCommunityManager does not have any property in the Atlantis community
    And CamellaTheCommunityManager creates a service ticket for DEF property
    And CamellaTheCommunityManager advances the service ticket from DRAFT to SUBMITTED
    And CamellaTheCommunityManager assigns the service ticket to MaddyTheMaintenancePerson
    And CamellaTheCommunityManager advances the service ticket from SUBMITTED to ASSIGNED
    And MaddyTheMaintenancePerson advances the service ticket from ASSIGNED to INPROGRESS
    When MaddyTheMaintenancePerson advances the service ticket from INPROGRESS to COMPLETED
    Then the service ticket status is COMPLETED

@dev-todo
  Rule: Service Ticket can be reopened after it is marked completed but not when closed

  Scenario:  Reopen the service ticket to InProgress
    Given CamellaTheCommunityManager is assigned the CommunityManager role at the Atlantis community
    And MaddyTheMaintenancePerson is assigned the MaintenancePerson role at the Atlantis community
    And CamellaTheCommunityManager does not have any property in the Atlantis community
    And CamellaTheCommunityManager creates a service ticket for DEF property
    And CamellaTheCommunityManager advances the service ticket from DRAFT to SUBMITTED
    And CamellaTheCommunityManager assigns the service ticket to MaddyTheMaintenancePerson
    And CamellaTheCommunityManager advances the service ticket from SUBMITTED to ASSIGNED
    And MaddyTheMaintenancePerson advances the service ticket from ASSIGNED to INPROGRESS
    And MaddyTheMaintenancePerson advances the service ticket from INPROGRESS to COMPLETED
    When CamellaTheCommunityManager advances the service ticket from COMPLETED to INPROGRESS
    And CamellaTheCommunityManager assigns the service ticket to MaddyTheMaintenancePerson
    Then the service ticket status is INPROGRESS