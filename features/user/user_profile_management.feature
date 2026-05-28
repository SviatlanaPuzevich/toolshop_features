Feature: User Profile Management

  Background:
    Given user is logged in
    And user opens profile page


  # -------------------------
  # PERSONAL INFORMATION
  # -------------------------

  Scenario: User sees all profile fields prefilled
    Given user signed up
    When user opens profile page
    Then all profile fields are prefilled with user data


  Scenario: User successfully updates full profile information
    Given user has valid profile data
    When user updates all required fields:
      | First name |
      | Last name  |
      | Phone      |
      | Country    |
      | Postcode   |
      | City       |
      | State      |
    And submits profile form
    Then profile is updated successfully
    And success message is displayed

  Scenario: User can not change email
    Given user has valid profile data
    When user types new email
    Then email is unchanged

  Scenario Outline: Required profile fields validation on submit
    Given user is on profile page
    When user clears "<field>"
    And submits profile form
    Then validation message for "<field>" is displayed

    Examples:
      | field      |
      | First name |
      | Last name  |
      | Phone      |
      | Country    |
      | Postcode   |
      | City       |
      | State      |


  Scenario: Profile changes are not validated before submit
    Given user clears "First name"
    When user leaves the field
    Then no validation message is displayed
    When user submits profile form
    Then validation message for "First name" is displayed


  # -------------------------
  # PASSWORD CHANGE
  # -------------------------

  Scenario: User successfully changes password
    When user enters correct current password
    And user enters valid new password
    And user confirms new password
    And submits password form
    Then password is updated successfully


  Scenario Outline: Password change validation errors
    When user enters current password "<current password>"
    And enters new password "<new password>"
    And confirms password "<confirm password>"
    And submits password form
    Then password error "<message>" is displayed

    Examples:
      | current password | new password | confirm password | message                                                                              |
      | wrong            | Newpass1!    | Newpass1!        | Your current password does not matches with the password.                            |
      | valid            | short        | short            | The new password field must be at least 8 characters.                                |
      | valid            | newpass1!    | newpass1!        | The new password field must contain at least one uppercase and one lowercase letter. |
      | valid            | Newpass1!    | mismatch         | The new password field confirmation does not match.                                  |
