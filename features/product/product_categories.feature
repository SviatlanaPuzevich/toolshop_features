Feature: Product Categories and Rentals

  Background:
    Given user is on the main catalog page
    And category dropdown is visible


  # -------------------------
  # CATEGORY SELECTION
  # -------------------------

  Scenario: User sees available categories in dropdown
    When user opens category dropdown
    Then available categories are displayed


  Scenario: User selects a category
    When user selects a category from dropdown
    Then only products from selected category are displayed
    And category-specific filter is displayed
    And only subfilters of selected category are visible


  Scenario: Category selection updates product list
    When user selects a category
    Then product list is refreshed
    And only relevant category products are shown


  Scenario: Empty category state
    Given selected category has no products
    When user selects that category
    Then empty state message is displayed



  # -------------------------
  # CATEGORY FILTERS
  # -------------------------

  Scenario: Category-specific filters are displayed
    When user selects a category
    Then only filters related to selected category are visible



  Scenario: Filters are hidden when switching category
    Given user selected a category
    When user selects another category
    Then previous category filters are not displayed


  # -------------------------
  # RENTALS SECTION
  # -------------------------

  Scenario: User selects Rentals category
    When user selects "Rentals" from dropdown
    Then rentals product list is displayed
    And only rental equipment is shown
    And no category filters are shown



  Scenario: User can not switch from Rentals to product category
    Given user is in Rentals section
    When user selects a product category
    Then categories dropdown is not available

