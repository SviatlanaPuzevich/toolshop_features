import BasePage from './page';

class RegistrationPage extends BasePage {
  public open() {
    return super.open('auth/register');
  }

  get firstName() {
    return $('#first_name');
  }

  get lastName() {
    return $('#last_name');
  }

  get dob() {
    return $('#dob');
  }

  get street() {
    return $('#street');
  }

  get houseNumber() {
    return $('#house_number');
  }

  get postcode() {
    return $('#postal_code');
  }

  get city() {
    return $('#city');
  }

  get state() {
    return $('#state');
  }

  get country() {
    return $('#country');
  }

  get phone() {
    return $('#phone');
  }

  get email() {
    return $('#email');
  }

  get password() {
    return $('#password');
  }

  get registerButton() {
    return $('button[type="submit"]');
  }

  getField(name: string) {
    const fields = {
      first_name: this.firstName,
      last_name: this.lastName,
      dob: this.dob,
      street: this.street,
      house_number: this.houseNumber,
      postal_code: this.postcode,
      city: this.city,
      state: this.state,
      country: this.country,
      phone: this.phone,
      email: this.email,
      password: this.password,
    };

    return fields[name as keyof typeof fields];
  }

  async clearFiled(name: string) {
    const field = this.getField(name);
    await field.click();
    const value = await field.getValue();
    if (value) {
      await browser.keys('End');
      await browser.keys(Array(value.length).fill('Backspace'));
    }
  }

  async fillValidForm(password = 'tP9$mX2!vK8#qZ5[', email: string | undefined = '') {
    await this.firstName.setValue('John');
    await this.lastName.setValue('Doe');
    await this.dob.setValue('1990-01-01');
    await this.street.setValue('Main street');
    await this.houseNumber.setValue('10');
    await this.postcode.setValue('12345');
    await this.city.setValue('Vilnius');
    await this.state.setValue('Vilnius');
    await this.country.selectByVisibleText('Lithuania');
    await this.phone.setValue('37061234567');
    await this.email.setValue(email || `john${Date.now()}@mail.com`);
    await this.password.setValue(password);
  }

  async submit() {
    await this.registerButton.click();
  }
}

export default new RegistrationPage();
