/** Credentials of an application user. */
export interface User {
  email: string;
  password: string;
}

/** Everything the registration form asks for. */
export interface RegistrationData extends User {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  phone: string;
}

/** Contact details a shopper provides when checking out without an account. */
export interface GuestContact {
  email: string;
  firstName: string;
  lastName: string;
}
