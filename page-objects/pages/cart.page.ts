import { expect, type Locator, type Page } from "@playwright/test";

export class cartPage {
    readonly page:Page;
    readonly cartTable: Locator;
    readonly checkoutButton: Locator;

    constructor( page: Page ) {
        this.page = page;
        this.cartTable = page.locator('.cart_info');
        this.checkoutButton = page.locator('.check_out');

    }

    async goto(){
        await this.page.goto('https://automationexercise.com/view_cart');
    }

}