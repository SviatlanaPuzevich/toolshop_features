Feature: User's registration

  Background:
    Given user opens registration popup

  Scenario: Successful registration
    Given user fills all required fields with valid data
    When submits the form
    Then account is created successfully
    And account is created successfully

  Scenario Outline: Required fields validation
    Given all required fields are filled with valid data
    And "<field>" is cleared
    When user leaves "<field>" empty
    And user moves focus away from field
    Then  validation message is displayed

    Examples:
      | field        |
      | First name   |
      | Last name    |
      | Birth day    |
      | Country      |
      | Postcode     |
      | House number |
      | City         |
      | State        |
      | Phone        |
      | Email        |
      | Password     |

  Scenario Outline: Invalid field format validation
    When user enters invalid "<field>" value "<value>"
    And user moves focus away from field
    Then validation error is displayed

    Examples:
      | field     | value     |
      | Birth day | 123
      | Phone     | +370222
      | Email     | email.com
      | Password  | 123


  Scenario Outline: Weak password is rejected
    When user enters password "<password>"
    And submits registration form
    Then password validation message "<message>" is displayed

    Examples:
      | password   | message                                      |
      | pass       | Password must be minimal 6 characters long.  |
      | password   | Password can not include invalid characters. |
      | Password   | Password can not include invalid characters. |
      | Password1  | Password can not include invalid characters. |
      | PASSWORD1! | Password can not include invalid characters. |

  Scenario: Compromised password is rejected
    When user enters compromised password "Qwerty123*"
    And submits registration form
    Then password data leak warning is displayed

  Scenario Outline: Underage users cannot register
    When user enters birth date "<birthDate>"
    And submits registration form
    Then age validation message "<message>" is displayed

    Examples:
      | birthDate  | message                            |
      | 2010-05-01 | User must be at least 18 years old |