Feature: Basket Management

  Background:
    Given user has products in basket
    And user opens basket page


  # -------------------------
  # BASKET DISPLAY
  # -------------------------

  Scenario: Basket products are displayed correctly
    Then product name is displayed
    And product price is displayed
    And product quantity is displayed
    And basket total price is displayed
    And "Continue shopping" button is displayed
    And "Proceed to checkout" button is disabled


  Scenario: Empty basket is displayed correctly
    Given basket is empty
    When user opens basket page
    Then empty basket message is displayed


  # -------------------------
  # PRODUCT QUANTITY
  # -------------------------

  Scenario: User increases product quantity in basket
    Given product quantity equals 1
    When user changes product quantity to 3
    Then product total price is updated
    And basket total price is updated


  Scenario: Product quantity cannot be less than 1
    Given product quantity equals 1
    When user types quantity to 0
    Then product quantity remains 1
    And total price remains same


  # -------------------------
  # REMOVE PRODUCTS
  # -------------------------

  Scenario: User removes product from basket
    Given basket contains one product
    When user removes product from basket
    Then product is removed successfully
    And successful meassage is desplayed
    And basket becomes empty


  Scenario: User removes one of multiple products
    Given basket contains multiple products
    When user removes one product
    Then selected product is removed
    And remaining products stay in basket
    And total price is recount


  # -------------------------
  # NAVIGATION
  # -------------------------

  Scenario: User continues shopping from basket
    When user clicks "Continue shopping"
    Then user is redirected to product catalog page
    And basket counter remains


  Scenario: User proceeds to checkout
    Given basket contains products
    When user clicks "Proceed to checkout"
    Then checkout page is opened
