import { expect, type Locator, type Page } from "@playwright/test";
import { User } from "../../utils/types";

export class LoginPage {
    readonly page:Page;
    readonly signUpForm: Locator;
    readonly loginForm: Locator;
    readonly nameField: Locator;
    readonly emailField: Locator;
    readonly signUpButton: Locator;
    readonly loginEmailField: Locator;
    readonly loginPasswordField: Locator;
    readonly loginButton: Locator;


    constructor( page: Page ) {
        this.page = page;
        this.signUpForm = page.locator(".signup-form");
        this.loginForm = page.locator(".login-form");
        this.nameField = this.signUpForm.getByTestId('signup-name');
        this.emailField = this.signUpForm.getByTestId('signup-email');
        this.signUpButton = this.signUpForm.getByTestId('signup-button');
        this.loginEmailField = this.loginForm.getByTestId('login-email');
        this.loginPasswordField = this.loginForm.getByTestId('login-password'); 
        this.loginButton = this.loginForm.getByTestId('login-button');
    }

    async goto(){
        await this.page.goto('https://automationexercise.com/login');
    }

    async fillSignUpForm( user: User ){
        await this.nameField.fill(user.username);
        await this.emailField.fill(user.email);
        await this.signUpButton.click();
    }

    async fillLoginForm( email: string, password: string ){

        await this.loginEmailField.fill(email);
        await this.loginPasswordField.fill(password);
        await this.loginButton.click();

    }
}