Feature: Checkout

  Background:
    Given user has products in basket


  Scenario: Existing user signs in during checkout
    Given user account exists
    When user proceeds to checkout
    And user signs in with valid credentials
    Then user is authenticated
    And checkout page is displayed


  Scenario: User creates account during checkout
    When user proceeds to checkout
    And user creates a new account with valid data
    Then account is created successfully
    And user is authenticated
    And checkout page is displayed


  Scenario: User continues checkout as guest
    When user proceeds to checkout
    And user selects "Continue as Guest"
    Then guest checkout form is displayed

 # -------------------------
  # NEGATIVE SCENARIOS
  # -------------------------
  Scenario: Sign in fails with invalid credentials
    Given user account exists
    When user proceeds to checkout
    And user signs in with invalid credentials
    Then authentication error message is displayed


  Scenario: Account creation fails with existing email
    Given user account exists
    When user proceeds to checkout
    And user attempts to create account using existing email
    Then account creation error message is displayed


