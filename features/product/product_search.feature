Feature: Product Search

  Background:
    Given user is on catalog page


  Scenario: User searches product by exact name
    When user enters product name into search field
    Then matching product is displayed


  Scenario: User searches product by partial name
    When user enters part of product name with more than 3 characters
    Then related matching products are displayed


  Scenario Outline: Search is not triggered for queries less than 3 characters
    When user enters 2 characters into search field
    Then search results are not displayed


  Scenario: User clears search input
    Given search results are displayed
    When user clicks clear search button
    Then full product catalog is displayed


  # -------------------------
  # SEARCH RESULTS
  # -------------------------

  Scenario: No products found
    When user searches for non-existing product
    Then empty search results message is displayed


  Scenario: Search results update dynamically
    When user changes search query
    Then displayed search results are updated


  # -------------------------
  # SEARCH BEHAVIOR
  # -------------------------

  Scenario: Search is case insensitive
    When user enters product name in uppercase
    Then matching products are displayed


  Scenario: Search results contain matching keyword
    When user searches by partial product name
    Then displayed products contain matching keyword in product name