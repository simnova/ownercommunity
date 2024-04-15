Feature: Create and manage service tickets

Background: 
  # Given OwenTheOwner creates Atlantis community
  # And he creates CommunityManager role in Atlantis community with following permissions:
  #   | communityPermissions      | canManageRolesAndPermissions, canManageSiteContent, canManageMembers |
  #   | serviceTicketPermissions  | canManageTickets |
  #   | servicePermissions        | canManageServices |
  # And he creates Member role in Atlantis community with following permissions:
  #   | serviceTicketPermissions  | canManageTickets |
  #   | servicePermissions        | canManageServices |
  # And MikeTheMember is assigned the Member role at the Atlantis community
  # And MikeTheMember has a ABC property in the Atlantis community
  # And WendyTheMember is assigned the Member role at the Atlantis community
  # And WendyTheMember has a DEF property in the Atlantis community
  # And CamellaTheCommunityManager is assigned the CommunityManager role at the Atlantis community
  # And MaddyTheMaintenancePerson is assigned the MaintenancePerson role at the Atlantis community


# @dev-todo
#   Scenario: Create service ticket
#     When MikeTheMember the Member creates a service ticket
#           | propertyName | "XYZ property name" |
#           | title | "Abc title" |
#           | description | "ABCDEF details" |
#           | priority | p5 |
#     Then the service ticket is created for XYZ property
#     And the service ticket status is DRAFT

# @dev-todo
#   Scenario: Member submits a service ticket for own property
#     When MikeTheMember the Member creates a service ticket
#           | propertyName | "XYZ property name" |
#           | title | "Abc title" |
#           | description | "ABCDEF details" |
#           | priority | p1 |
#     And MikeTheMember advances the service ticket from DRAFT to SUBMITTED
#     Then the service ticket is created for ABC property
#     And the service ticket status is SUBMITTED

# @dev-todo
#   Rule: Members are not allowed to create service ticket for the property not owned by them 

#   Scenario: Member submits a service ticket for a property not owned
#     When WendyTheMember the Member creates a service ticket for the property not owned by her
#           | propertyName | "XYZ property name" |
#     Then the service ticket is not created for XYZ property

# @dev-todo
#   Scenario: CommunityManager submits a service ticket for the property
#     When CamellaTheCommunityManager the CommunityManager creates a service ticket
#           | propertyName | "XYZ property name" |
#           | title | "Abc title" |
#           | description | "ABCDEF details" |
#           | requester | "MikeTheMember" |
#           | priority | p2 |
#     And CamellaTheCommunityManager advances the service ticket from DRAFT to SUBMITTED
#     Then the service ticket is created for DEF property
#     And the service ticket status is SUBMITTED

# @dev-todo
#   Scenario: Update the service ticket from SUBMITTED to ASSIGNED
#     Given MikeTheMember the Member creates a service ticket
#           | propertyName | "XYZ property name" |
#           | title | "Abc title" |
#           | description | "ABCDEF details" |
#           | priority | p3 |
#     And MikeTheMember advances the service ticket from DRAFT to SUBMITTED
#     When CamellaTheCommunityManager assigns the service ticket to MaddyTheMaintenancePerson
#     And CamellaTheCommunityManager advances the service ticket from SUBMITTED to ASSIGNED
#     Then the service ticket status is ASSIGNED
#     And the service ticket is assigned to MaddyTheMaintenancePerson

# @dev-todo
#   Scenario: Update the service ticket from ASSIGNED to SUBMITTED
#     Given MikeTheMember the Member creates a service ticket
#           | propertyName | "XYZ property name" |
#           | title | "Abc title" |
#           | description | "ABCDEF details" |
#           | priority | p4 |
#     And MikeTheMember advances the service ticket from DRAFT to SUBMITTED
#     And CamellaTheCommunityManager assigns the service ticket to MaddyTheMaintenancePerson
#     And CamellaTheCommunityManager advances the service ticket from SUBMITTED to ASSIGNED
#     When CamellaTheCommunityManager advances the service ticket from ASSIGNED to SUBMITTED
#     Then the service ticket status is SUBMITTED
#     And the service ticket is unassigned

# @dev-todo
#   Scenario: Update the service ticket from ASSIGNED to INPROGRESS
#     Given MikeTheMember the Member creates a service ticket
#           | propertyName | "XYZ property name" |
#           | title | "Abc title" |
#           | description | "ABCDEF details" |
#           | priority | p5 |
#     And MikeTheMember advances the service ticket from DRAFT to SUBMITTED
#     And CamellaTheCommunityManager assigns the service ticket to MaddyTheMaintenancePerson
#     And CamellaTheCommunityManager advances the service ticket from SUBMITTED to ASSIGNED
#     When MaddyTheMaintenancePerson advances the service ticket from ASSIGNED to INPROGRESS
#     Then the service ticket status is INPROGRESS

# @dev-todo
#   Scenario:  Update the service ticket from INPROGRESS to ASSIGNED
#     Given MikeTheMember the Member creates a service ticket
#           | propertyName | "XYZ property name" |
#           | title | "Abc title" |
#           | description | "ABCDEF details" |
#           | priority | p5 |
#     And MikeTheMember advances the service ticket from DRAFT to SUBMITTED
#     And CamellaTheCommunityManager assigns the service ticket to MaddyTheMaintenancePerson
#     And CamellaTheCommunityManager advances the service ticket from SUBMITTED to ASSIGNED
#     And MaddyTheMaintenancePerson advances the service ticket from ASSIGNED to INPROGRESS
#     When MaddyTheMaintenancePerson advances the service ticket from INPROGRESS to ASSIGNED
#     Then the service ticket status is ASSIGNED

# @dev-todo
#   Scenario:  Update the service ticket from INPROGRESS to COMPLETED
#     Given MikeTheMember the Member creates a service ticket
#           | propertyName | "XYZ property name" |
#           | title | "Abc title" |
#           | description | "ABCDEF details" |
#           | priority | p5 |
#     And MikeTheMember advances the service ticket from DRAFT to SUBMITTED
#     And CamellaTheCommunityManager assigns the service ticket to MaddyTheMaintenancePerson
#     And CamellaTheCommunityManager advances the service ticket from SUBMITTED to ASSIGNED
#     And MaddyTheMaintenancePerson advances the service ticket from ASSIGNED to INPROGRESS
#     When MaddyTheMaintenancePerson advances the service ticket from INPROGRESS to COMPLETED
#     Then the service ticket status is COMPLETED

# @dev-todo
#   Rule: Service Ticket can be reopened after it is marked completed but not when closed

#   Scenario:  Update the service ticket from COMPLETED to INPROGRESS
#     Given MikeTheMember the Member creates a service ticket
#           | propertyName | "XYZ property name" |
#           | title | "Abc title" |
#           | description | "ABCDEF details" |
#           | priority | p5 |
#     And MikeTheMember advances the service ticket from DRAFT to SUBMITTED
#     And CamellaTheCommunityManager assigns the service ticket to MaddyTheMaintenancePerson
#     And CamellaTheCommunityManager advances the service ticket from SUBMITTED to ASSIGNED
#     And MaddyTheMaintenancePerson advances the service ticket from ASSIGNED to INPROGRESS
#     And MaddyTheMaintenancePerson advances the service ticket from INPROGRESS to COMPLETED
#     When CamellaTheCommunityManager advances the service ticket from COMPLETED to INPROGRESS
#     And CamellaTheCommunityManager assigns the service ticket to MaddyTheMaintenancePerson
#     Then the service ticket status is INPROGRESS


#   @dev-todo
#   Scenario:  Update the service ticket from COMPLETED to CLOSED
#    Given MikeTheMember the Member creates a service ticket
#           | propertyName | "XYZ property name" |
#           | title | "Abc title" |
#           | description | "ABCDEF details" |
#           | priority | p5 |
#     And MikeTheMember advances the service ticket from DRAFT to SUBMITTED
#     And CamellaTheCommunityManager assigns the service ticket to MaddyTheMaintenancePerson
#     And CamellaTheCommunityManager advances the service ticket from SUBMITTED to ASSIGNED
#     And MaddyTheMaintenancePerson advances the service ticket from ASSIGNED to INPROGRESS
#     And MaddyTheMaintenancePerson advances the service ticket from INPROGRESS to COMPLETED
#     When CamellaTheCommunityManager advances the service ticket from COMPLETED to CLOSED
#     Then the service ticket status is CLOSED

#   @dev-todo
#   Scenario:  Update the service ticket from CLOSED to INPROGRESS
#    Given MikeTheMember the Member creates a service ticket
#           | propertyName | "XYZ property name" |
#           | title | "Abc title" |
#           | description | "ABCDEF details" |
#           | priority | p5 |
#     And MikeTheMember advances the service ticket from DRAFT to SUBMITTED
#     And CamellaTheCommunityManager assigns the service ticket to MaddyTheMaintenancePerson
#     And CamellaTheCommunityManager advances the service ticket from SUBMITTED to ASSIGNED
#     And MaddyTheMaintenancePerson advances the service ticket from ASSIGNED to INPROGRESS
#     And MaddyTheMaintenancePerson advances the service ticket from INPROGRESS to COMPLETED
#     And CamellaTheCommunityManager advances the service ticket from COMPLETED to CLOSED
#     When CamellaTheCommunityManager advances the service ticket from CLOSED to INPROGRESS
#     Then the service ticket status is INPROGRESS

# @dev-todo
#   Scenario: Memeber deletes the DRAFT service ticket
#     Given MikeTheMember the Member creates a service ticket
#           | propertyName | "XYZ property name" |
#           | title | "Abc title" |
#           | description | "ABCDEF details" |
#           | priority | p5 |
#     And the service ticket is created for XYZ property
#     When he deletes the service ticket
#     Then the service ticket is deleted

# @dev-todo
#   Scenario: Member deletes the SUBMMITTED service ticket
#     Given MikeTheMember the Member creates a service ticket
#           | propertyName | "XYZ property name" |
#           | title | "Abc title" |
#           | description | "ABCDEF details" |
#           | priority | p5 |
#     And the service ticket is created for XYZ property
#     And MikeTheMember advances the service ticket from DRAFT to SUBMITTED
#     When he deletes the service ticket
#     Then the service ticket is not deleted

# @dev-todo
#   Scenario: CommunityManager deletes the service ticket
#     Given CamellaTheCommunityManager the CommunityManager creates a service ticket
#           | propertyName | "XYZ property name" |
#           | title | "Abc title" |
#           | description | "ABCDEF details" |
#           | requester | "MikeTheMember" |
#           | priority | p2 |
#     And CamellaTheCommunityManager advances the service ticket from DRAFT to SUBMITTED
#     When she deletes the service ticket
#     Then the service ticket is deleted
  
