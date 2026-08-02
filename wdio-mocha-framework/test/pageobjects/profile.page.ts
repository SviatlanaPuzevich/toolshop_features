import Page from './page';

class ProfilePage extends Page {
  public async open() {
    await super.open('account/profile');
    await browser.waitUntil(
      async () => {
        const value = await this.firstName.getValue();
        return value.length > 0;
      },
      {
        timeout: 5000,
        timeoutMsg: 'Profile data was not loaded',
      }
    );
  }

  get firstName() {
    return $('#first_name');
  }
  get lastName() {
    return $('#last_name');
  }
  get phone() {
    return $('#phone');
  }
  get country() {
    return $('#country');
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
  get email() {
    return $('#email');
  }

  get updateProfileButton() {
    return $('button[data-test="update-profile-submit"]');
  }

  get currentPassword() {
    return $('#current-password');
  }

  get newPassword() {
    return $('#new-password');
  }

  get confirmPassword() {
    return $('#new-password-confirm');
  }

  get changePasswordButton() {
    return this.getElementByDataTestAttribute('change-password-submit');
  }

  get successAlert() {
    return $('.alert-success');
  }

  get errorAlert() {
    return $('div.alert-danger');
  }

  get alert() {
    return $('.alert');
  }

  getField(field: string) {
    const fields = {
      'First name': this.firstName,
      'Last name': this.lastName,
      Phone: this.phone,
      Country: this.country,
      Postcode: this.postcode,
      City: this.city,
      State: this.state,
    };

    return fields[field as keyof typeof fields];
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

  async updateProfile(data: {
    firstName: string;
    lastName: string;
    phone: string;
    postcode: string;
    city: string;
    state: string;
    country: string;
  }) {
    await this.firstName.setValue(data.firstName);
    await this.lastName.setValue(data.lastName);
    await this.phone.setValue(data.phone);
    await this.postcode.setValue(data.postcode);
    await this.city.setValue(data.city);
    await this.state.setValue(data.state);
    await this.country.setValue(data.country);
  }

  async submitProfile() {
    await this.updateProfileButton.click();
  }

  async submitPasswordChange() {
    await this.changePasswordButton.click();
  }
}

export default new ProfilePage();
