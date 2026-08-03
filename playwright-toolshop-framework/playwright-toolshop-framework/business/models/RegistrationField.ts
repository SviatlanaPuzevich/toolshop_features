/** Names the registration form uses for its fields, both in ids and validation messages. */
export const RegistrationField = {
  firstName: 'first_name',
  lastName: 'last_name',
  dateOfBirth: 'dob',
  street: 'street',
  houseNumber: 'house_number',
  postalCode: 'postal_code',
  city: 'city',
  state: 'state',
  country: 'country',
  phone: 'phone',
  email: 'email',
  password: 'password',
} as const;

export type RegistrationField = (typeof RegistrationField)[keyof typeof RegistrationField];

/** Every field of the form except the country, which is a drop down instead of a text input. */
export type RegistrationTextField = Exclude<RegistrationField, typeof RegistrationField.country>;
