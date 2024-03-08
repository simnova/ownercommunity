Feature: Create a service ticket

Scenario: Setup
  Given Atlantis is a community
  # Given Cottage is a property in Atlantis
  # Given Villa is a property in Atlantis 
  # Given Palms is a community
  # Given Lucy is a user
  # Given Sean is a user

  # Rule: Member with canCreateTickets permission can only create a service ticket for their own property
  #   Scenario: Member creates a service ticket for their property
  #     Given Lucy is a member of the Atlantis community
  #     And Lucy has a property in the Atlantis community
  #     When Lucy creates a service ticket for her property
  #     Then Lucy's service ticket is created for her property
  # Rule: Member with canCreateTickets permission cannot create a service ticket for a property not owned by them
  #   Scenario: Member creates a service ticket for a property not owned by them
  #     Given Lucy is a member of the Atlantis community
  #     And Lucy has a property in the Atlantis community
  #     When Lucy creates a service ticket for a property not owned by her
  #     Then Lucy's service ticket is not created for the property not owned by her
  # Rule: Member with canManageTickets permission can create a service ticket for any property in the community
  #   Scenario: Member creates a service ticket for a property not owned by them
  #     Given Lucy is a member of the Atlantis community
  #     And Lucy has the canManageTickets permission
  #     When Lucy creates a service ticket for a property not owned by her
  #     Then Lucy's service ticket is created for the property not owned by her
