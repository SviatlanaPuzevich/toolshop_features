import { Page, Locator } from '@playwright/test';
import BasePage from "./BasePage";

export class RegisterPage extends BasePage{
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly dob: Locator;
    readonly street: Locator;
    readonly houseNumber: Locator;
    readonly postcode: Locator;
    readonly city: Locator;
    readonly state: Locator;
    readonly country: Locator;
    readonly phone: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly registerButton: Locator;

    constructor(page: Page) {
        super(page);
        this.firstName = page.locator('#first_name');
        this.lastName = page.locator('#last_name');
        this.dob = page.locator('#dob');
        this.street = page.locator('#street');
        this.houseNumber = page.locator('#house_number');
        this.postcode = page.locator('#postal_code');
        this.city = page.locator('#city');
        this.state = page.locator('#state');
        this.country = page.locator('#country');
        this.phone = page.locator('#phone');
        this.email = page.locator('#email');
        this.password = page.locator('#password');
        this.registerButton = page.locator('button[type="submit"]');
    }

    public async open() {
        return await this.page.goto('auth/register');
    }

    getField(name: string): Locator {
        const fields: Record<string, Locator> = {
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

        return fields[name];
    }

    async clearField(name: string) {
        const field = this.getField(name);
        await field.fill('');
    }

    async fillValidForm(password = 'tP9$mX2!vK8#qZ5[', email: string | undefined = '') {
        await this.firstName.fill('John');
        await this.lastName.fill('Doe');
        await this.dob.fill('1990-01-01');
        await this.street.fill('Main street');
        await this.houseNumber.fill('10');
        await this.postcode.fill('12345');
        await this.city.fill('Vilnius');
        await this.state.fill('Vilnius');

        await this.country.selectOption({ label: 'Lithuania' });

        await this.phone.fill('37061234567');
        await this.email.fill(email || `john${Date.now()}@mail.com`);
        await this.password.fill(password);
    }

    async submit() {
        await this.registerButton.click();
    }
}