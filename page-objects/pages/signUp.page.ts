import { expect, type Locator, type Page } from "@playwright/test";
import { User } from "../../utils/types";

export class signUpPage {
    readonly page:Page;
    readonly registrationFormSection: Locator;
    readonly registrationForm: Locator;

    constructor( page: Page ) {
        this.page = page;
        this.registrationFormSection = page.locator('.login-form');
        this.registrationForm = this.registrationFormSection.locator('form');
    }

    async fillRegistrationForm( user: User ){
        await this.registrationForm.locator('.radio').all().then( (radios) => radios[Math.floor(Math.random() * radios.length)].click() );
        await this.registrationForm.getByTestId('name').fill(user.username);
        await this.registrationForm.getByTestId('password').fill(user.password);
        await this.registrationForm.getByTestId('days').selectOption({ label: user.birthdate.getDate().toString() });
        await this.registrationForm.getByTestId('months').selectOption({ label: user.birthdate.toLocaleString('default', { month: 'long' }) });
        await this.registrationForm.getByTestId('years').selectOption({ label: user.birthdate.getFullYear().toString() });
        await this.registrationForm.locator('#newsletter').check();
        await this.registrationForm.locator('#optin').check();
        await this.registrationForm.getByTestId('first_name').fill(user.firstName);
        await this.registrationForm.getByTestId('last_name').fill(user.lastName);
        await this.registrationForm.getByTestId('company').fill(user.company);
        await this.registrationForm.getByTestId('address').fill(user.address);
        await this.registrationForm.getByTestId('country').selectOption({ label: user.country });
        await this.registrationForm.getByTestId('state').fill(user.state);
        await this.registrationForm.getByTestId('city').fill(user.city);
        await this.registrationForm.getByTestId('zipcode').fill(user.zipCode);
        await this.registrationForm.getByTestId('mobile_number').fill(user.phone);
        await this.registrationForm.getByTestId('create-account').click();
    }
}