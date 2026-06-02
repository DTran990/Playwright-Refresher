import { expect, type Locator, type Page } from "@playwright/test";

export class productDetailPage {
    readonly page:Page;
    readonly productInformation: Locator;

    constructor( page: Page ) {
        this.page = page;
        this.productInformation = page.locator('.product-information');
    }

}