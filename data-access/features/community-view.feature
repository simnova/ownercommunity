Feature: View my communities

  Background:
    Given DanielTheOcean registers with Owner Community

  Scenario: My Communities
    Given DanielTheOcean is member of the following communities:
      | Community Name |
      | Bellagio |
      | Caesar's palace |
    When he views his communities
    Then he should see the following communities:
      | Community Name |
      | Bellagio |
      | Caesar's palace |