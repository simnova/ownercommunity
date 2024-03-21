Feature: Create a property Listing in a community

  As a community owner
  I want to be able to create a property listing in my community
  So that I can sell my property to the community members

Background: 
  Given LordOfTheOwner creates Milords community
  And he creates CommunityManager role in Milords community with following permissions:
    | communityPermissions      | canManageRolesAndPermissions, canManageSiteContent, canManageMembers |
    | serviceTicketPermissions  | canManageTickets |
    | servicePermissions        | canManageServices |

Scenario: Add a property listing to the Milords community
  Given LordOfTheOwner creates a property Mar-a-Lago in the Milords community
  When LordOfTheOwner lists the property Mar-a-Lago for Sale
  Then the property should be listed for Sale in the Milords community Listings