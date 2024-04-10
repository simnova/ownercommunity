Feature: Create a property Listing in a community

  As a community owner, DumbledoreTheWizard
  I want to be able to create a property listing in my community
  So that I can sell/rent/lease my property to the community members

  Background: 
    Given DumbledoreTheWizard creates Hogwarts community
    And he creates CommunityManager role in Hogwarts community with following permissions:
      | communityPermissions      | canManageRolesAndPermissions, canManageSiteContent, canManageMembers |
      | serviceTicketPermissions  | canManageTickets |
      | servicePermissions        | canManageServices |

  Scenario: Add a property listing for Sale to the Hogwarts community
    Given DumbledoreTheWizard creates a property GryffindorTower in the Hogwarts community
    When he lists the property GryffindorTower for Sale
    Then the property should be listed for Sale in the Hogwarts community Listings

  Scenario: Add a property listing for Rent to the Hogwarts community
    Given DumbledoreTheWizard creates a property GryffindorTower in the Hogwarts community
    When he lists the property GryffindorTower for Rent
    Then the property should be listed for Rent in the Hogwarts community Listings

  Scenario: Add a property listing for Lease to the Hogwarts community
    Given DumbledoreTheWizard creates a property GryffindorTower in the Hogwarts community
    When he lists the property GryffindorTower for Lease
    Then the property should be listed for Lease in the Hogwarts community Listings