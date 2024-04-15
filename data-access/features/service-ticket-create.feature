Feature: Create service ticket
  
  @dev-todo
  Scenario: Create service ticket
    When MikeTheMember the Member creates a service ticket
          | propertyName | "XYZ property name" |
          | title | "Abc title" |
          | description | "ABCDEF details" |
          | priority | p5 |
    Then the service ticket is created for XYZ property
    And the service ticket status is DRAFT