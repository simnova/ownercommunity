Feature: Create a property Listing in a community

  As a community owner
  I want to be able to create a property listing in my community
  So that I can sell/rent my property to the community members

  Background: 
    Given LordOfTheOwner creates Milords community
    And he creates CommunityManager role in Milords community with following permissions:
      | communityPermissions      | canManageRolesAndPermissions, canManageSiteContent, canManageMembers |
      | serviceTicketPermissions  | canManageTickets |
      | servicePermissions        | canManageServices |

  Scenario: Add a property listing for Sale to the Milords community
    Given LordOfTheOwner creates a property Mar-a-Lago in the Milords community
    When he lists the property Mar-a-Lago for Sale
    Then the property should be listed for Sale in the Milords community Listings

  Scenario: Add a property listing for Rent to the Milords community
    Given LordOfTheOwner creates a property Mar-a-Lago in the Milords community
    When he lists the property Mar-a-Lago for Rent
    Then the property should be listed for Rent in the Milords community Listings

  Scenario: Add a property listing for Lease to the Milords community
    Given LordOfTheOwner creates a property Mar-a-Lago in the Milords community
    When he lists the property Mar-a-Lago for Lease
    Then the property should be listed for Lease in the Milords community Listings