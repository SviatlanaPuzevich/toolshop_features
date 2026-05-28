Feature: Favorite Products

  Background:
    Given user is logged in
    And user has favorite products
    And user opens favorites page


  # -------------------------
  # FAVORITES DISPLAY
  # -------------------------

  Scenario: Favorite products are displayed correctly
    Then favorite product image is displayed
    And favorite product name is displayed
    And favorite product  short description is displayed


  Scenario: Empty favorites page is displayed correctly
    Given user has no favorite products
    When user opens favorites page
    Then empty favorites message is displayed


  # -------------------------
  # REMOVE FAVORITES
  # -------------------------

  Scenario: User removes product from favorites
    Given favorites contains multiply product
    When user removes product from favorites
    Then product is removed successfully
    And other prosucts remain




