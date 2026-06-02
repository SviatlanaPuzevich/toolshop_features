Feature: Product Filters and Sorting

  Background:
    Given user is on catalog page


  # -------------------------
  # SORTING
  # -------------------------

  Scenario Outline: User sorts products by selected criteria
    When user selects "<sortOption>"
    Then products are sorted accordingly

    Examples:
      | sortOption           |
      | Name (A - Z)         |
      | Name (Z - A)         |
      | Price (Low - High)   |
      | Price (High - Low)   |
      | CO2 (Low - High)     |
      | CO2 (High - Low)     |


  Scenario: Sorting is preserved after applying filters
    Given products are sorted by "Price (High - Low)"
    When user applies category filter
    Then products remain sorted by "Price (High - Low)"


  # -------------------------
  # PRICE RANGE
  # -------------------------

  Scenario: User filters products by minimum and maximum price
    When user selects price range from 50 to 150
    Then only products within selected price range are displayed


  Scenario: User adjusts minimum price only
    When user increases minimum price
    Then products below selected minimum price are hidden


  Scenario: User adjusts maximum price only
    When user decreases maximum price
    Then products above selected maximum price are hidden



  # -------------------------
  # CATEGORY FILTERS
  # -------------------------

  Scenario Outline: User filters products by top-level category
    When user selects "<category>" category
    Then only products from "<category>" category are displayed

    Examples:
      | category    |
      | Hand Tools  |
      | Power Tools |
      | Other       |


  Scenario Outline: User filters products by subcategory
    Given "<category>" category is expanded
    When user selects "<subcategory>"
    Then only products from "<subcategory>" are displayed

    Examples:
      | category    | subcategory    |
      | Hand Tools  | Hammer         |
      | Hand Tools  | Wrench         |
      | Power Tools | Grinder        |
      | Power Tools | Drill          |
      | Other       | Safety Gear    |
      | Other       | Workbench      |


  Scenario: User selects multiple subcategories
    Given category filters are available
    When user selects multiple subcategories
    Then products matching selected subcategories are displayed


  Scenario: User removes category filter
    Given category filter is applied
    When user deselects category filter
    Then all products are displayed


  # -------------------------
  # BRAND FILTERS
  # -------------------------

  Scenario Outline: User filters products by brand
    When user selects "<brand>" brand
    Then only products of "<brand>" are displayed

    Examples:
      | brand                 |
      | ForgeFlex Tools       |
      | MightyCraft Hardware  |


  Scenario: User selects multiple brands
    When user selects multiple brands
    Then products from selected brands are displayed


  # -------------------------
  # SUSTAINABILITY FILTER
  # -------------------------

  Scenario: User filters eco-friendly products
    When user enables eco-friendly products filter
    Then only eco-friendly products are displayed


  Scenario: User disables eco-friendly products filter
    Given eco-friendly filter is enabled
    When user disables eco-friendly products filter
    Then all products are displayed


  # -------------------------
  # FILTER COMBINATIONS
  # -------------------------

  Scenario: User combines category and brand filters
    When user selects category "Hand Tools"
    And user selects brand "ForgeFlex Tools"
    Then only matching products are displayed


  Scenario: User combines category and sustainability filters
    When user selects category "Power Tools"
    And user enables eco-friendly products filter
    Then only matching products are displayed


  Scenario: User combines category, brand and sustainability filters
    When user selects category "Hand Tools"
    And user selects brand "ForgeFlex Tools"
    And user enables eco-friendly products filter
    Then only matching products are displayed


  # -------------------------
  # EMPTY RESULTS
  # -------------------------

  Scenario: No products match selected filters
    When user applies filters with no matching products
    Then empty results message is displayed


  # -------------------------
  # FILTER RESET
  # -------------------------

  Scenario: User clears all filters
    Given multiple filters are applied
    When user clears all filters
    Then all products are displayed


