Feature: Language Switching

  Background:
    Given user opens the application


  Scenario Outline: User changes application language
    When user selects "<language>" language
    Then application interface is displayed in "<language>"

    Examples:
      | language |
      | DE       |
      | EL       |
      | EN       |
      | ES       |
      | FR       |
      | NL       |
      | TR       |



  Scenario: Interface is translated after language change
    When user changes application language
    Then user interface is translated
    And product catalog is not translated


  Scenario: Language selector displays available languages
    Then following languages are available:
      | DE |
      | EL |
      | EN |
      | ES |
      | FR |
      | NL |
      | TR |
