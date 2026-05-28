Feature: Product Details Page

  Background:
    Given user is on product catalog page
    When user opens product details page


  # -------------------------
  # PRODUCT INFORMATION
  # -------------------------

  Scenario: Product details are displayed correctly
    Then product image is displayed
    And product name is displayed
    And product description is displayed
    And product price is displayed
    And product CO2 level is displayed
    And product tags are displayed
    And product specification is displayed


  Scenario: Related products section is displayed
    Then related products section is visible
    And related products are displayed



  # -------------------------
  # PRODUCT QUANTITY
  # -------------------------

  Scenario: User increases product quantity
    Given product quantity equals 1
    When user clicks "+" button
    Then product quantity equals 2


  Scenario: User decreases product quantity
    Given product quantity equals 2
    When user clicks "-" button
    Then product quantity equals 1


  Scenario: Product quantity cannot be less than 1
    Given product quantity equals 1
    When user clicks "-" button
    Then product quantity remains 1

  Scenario: User enters product quantity
    Given product quantity equals 2
    When user types 17
    Then product quantity equals 17


  # -------------------------
  # ADD TO BASKET
  # -------------------------

  Scenario: User adds product to basket
    Given product quantity equals 1
    When user clicks "Add to basket"
    Then product is added to basket
    And user sees notification
    And basket counter is updated


  Scenario: User adds multiple products to basket
    Given product quantity equals 3
    When user clicks "Add to basket"
    Then 3 products are added to basket


  # -------------------------
  # FAVORITES
  # -------------------------

  Scenario: User adds product to favorites
    When user clicks "Add to favorites"
    Then product is added to favorites list


  Scenario: User can not add to favourites existing favourite item
    Given product is already in favorites
    When user clicks "Add to favorites"
    Then error message is displayed


  # -------------------------
  # PRODUCT COMPARISON
  # -------------------------

  Scenario: User adds product to comparison
    When user clicks "Compare"
    Then product is added to comparison list
    And user sees notification
    And comarison counter is updated


  Scenario: User can not add to compare already added product
    Given product is already added to comparison
    When user clicks "Compare"
    Then error message is displayed
