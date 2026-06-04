import { expect, type Locator, type Page } from "@playwright/test";

export class checkoutPage {
    readonly page:Page;
    readonly placeOrderButton: Locator;
    readonly checkoutSection: Locator;
    readonly cartItems: Locator;
    readonly paymentSection: Locator;
    readonly paymentForm: Locator;
    readonly nameField: Locator;
    readonly cardNumberField: Locator
    readonly cvcField: Locator;
    readonly expiryMonthField: Locator;
    readonly expiryYearField: Locator;
    readonly payButton: Locator;

    constructor( page: Page ) {
        this.page = page;
        this.checkoutSection = page.locator('#cart_items');
        this.placeOrderButton = this.checkoutSection.locator('.check_out');
        this.cartItems = this.checkoutSection.locator('#cart_info table tbody');
        this.paymentSection = page.locator('.payment-information');
        this.paymentForm = this.paymentSection.locator('form#payment-form');
        this.nameField = this.paymentForm.getByTestId('name-on-card');
        this.cardNumberField = this.paymentForm.getByTestId('card-number');
        this.cvcField = this.paymentForm.getByTestId('cvc');
        this.expiryMonthField = this.paymentForm.getByTestId('expiry-month');
        this.expiryYearField = this.paymentForm.getByTestId('expiry-year');
        this.payButton = this.paymentForm.getByTestId('pay-button');
    }

    async goto(){
        await this.page.goto('https://automationexercise.com/checkout');
    }
    
    async fillPaymentForm( name: string, cardNumber: string, cvc: string, expiryMonth: string, expiryYear: string ){
        await this.nameField.fill(name);
        await this.cardNumberField.fill(cardNumber);
        await this.cvcField.fill(cvc);
        await this.expiryMonthField.fill(expiryMonth);
        await this.expiryYearField.fill(expiryYear);
        await this.payButton.click();
    }
}