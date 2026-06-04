import { expect, type Locator, type Page } from "@playwright/test";

export class orderConfirmationPage {
    readonly page:Page;
    readonly section: Locator;
    readonly orderPlacedMessage: Locator;

    constructor( page: Page ) {
        this.page = page;
        this.section = page.locator('#form');
        this.orderPlacedMessage = this.section.getByTestId('order-placed');
    }

}