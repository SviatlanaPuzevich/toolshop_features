import {
  BirthDateFactory,
  RegistrationField,
  RegistrationTextField,
} from '../../business/index.js';

/** Fields the shop refuses to accept empty. */
export const REQUIRED_FIELDS: RegistrationTextField[] = [
  RegistrationField.firstName,
  RegistrationField.lastName,
  RegistrationField.dateOfBirth,
  RegistrationField.houseNumber,
  RegistrationField.postalCode,
  RegistrationField.phone,
  RegistrationField.email,
  RegistrationField.password,
];

/**
 * Address fields the shop does not ask for twice: when they are left empty, they are
 * completed from the postcode lookup instead of being reported as missing.
 */
export const AUTO_COMPLETED_ADDRESS_FIELDS: RegistrationTextField[] = [
  RegistrationField.street,
  RegistrationField.city,
  RegistrationField.state,
];

export const INVALID_FORMAT_CASES: {
  title: string;
  field: RegistrationTextField;
  value: string;
}[] = [
  { title: 'date of birth', field: RegistrationField.dateOfBirth, value: '123' },
  { title: 'phone number', field: RegistrationField.phone, value: '+370222' },
  { title: 'email address', field: RegistrationField.email, value: 'email.com' },
];

export const WEAK_PASSWORD_CASES: { title: string; password: string }[] = [
  { title: 'no upper case letter', password: 'password1!' },
  { title: 'no lower case letter', password: 'PASSWORD1!' },
  { title: 'no digit', password: 'Password!' },
  { title: 'no special character', password: 'Password1' },
  { title: 'no letters', password: '123456!' },
  { title: 'fewer characters than required', password: 'Pass!' },
];

export const STRONG_PASSWORD = 'tP9$mX2!vK8#qZ5[';

/** Born one day earlier than the minimum age requires, so the customer is already old enough. */
export const BIRTH_DATE_OF_ALLOWED_CUSTOMER = BirthDateFactory.forMinimumAge(-1);

export const UNDERAGE_CASES: { title: string; birthDate: string }[] = [
  { title: 'reaches the minimum age today', birthDate: BirthDateFactory.forMinimumAge(0) },
  { title: 'is one day too young', birthDate: BirthDateFactory.forMinimumAge(1) },
];
