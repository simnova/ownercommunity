Feature: Delete Service Ticket

@dev-todo
  Scenario: Memeber deletes the DRAFT service ticket
    Given MikeTheMember the Member creates a service ticket
          | propertyName | "XYZ property name" |
          | title | "Abc title" |
          | description | "ABCDEF details" |
          | priority | p5 |
    And the service ticket is created for XYZ property
    When he deletes the service ticket
    Then the service ticket is deleted

@dev-todo
  Scenario: Member deletes the SUBMMITTED service ticket
    Given MikeTheMember the Member creates a service ticket
          | propertyName | "XYZ property name" |
          | title | "Abc title" |
          | description | "ABCDEF details" |
          | priority | p5 |
    And the service ticket is created for XYZ property
    And MikeTheMember advances the service ticket from DRAFT to SUBMITTED
    When he deletes the service ticket
    Then the service ticket is not deleted

@dev-todo
  Scenario: CommunityManager deletes the service ticket
    Given CamellaTheCommunityManager the CommunityManager creates a service ticket
          | propertyName | "XYZ property name" |
          | title | "Abc title" |
          | description | "ABCDEF details" |
          | requester | "MikeTheMember" |
          | priority | p2 |
    And CamellaTheCommunityManager advances the service ticket from DRAFT to SUBMITTED
    When she deletes the service ticket
    Then the service ticket is deleted