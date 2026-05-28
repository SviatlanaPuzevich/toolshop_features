Feature: User Sign In

  Background:
    Given user is on sign in page


  # -------------------------
  # EMAIL / PASSWORD LOGIN
  # -------------------------

  Scenario: Successful login with valid credentials
    When user enters registered email and password
    And submits the form
    Then user is logged in successfully
    And user is redirected to account page


  Scenario Outline: Required fields validation
    When user enters email "<email>" and password "<password>"
    And And user moves focus away from field
    Then login error message "<message>" is displayed

    Examples:
      | email         | password  | message              |
      | ""            | password1 | Email is required    |
      | user@test.com | ""        | Password is required |


  Scenario Outline: Login fails with invalid credentials
    When user enters email "<email>" and password "<password>"
    And submit form
    Then login error message "<message>" is displayed

    Examples:
      | email            | password  | message                   |
      | user@test.com    | wrong123  | Invalid email or password |
      | unknown@test.com | password1 | Invalid email or password |




