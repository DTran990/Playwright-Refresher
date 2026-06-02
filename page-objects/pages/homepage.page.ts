import { expect, type Locator, type Page } from "@playwright/test";

export class homepage {
    readonly page:Page;
    readonly navbar: Locator;
    readonly homepageSlider: Locator;

    constructor( page: Page ) {
        this.page = page;
        this.navbar = page.locator('.navbar-nav');
        this.homepageSlider = page.locator('#slider');
    }

    async goto(){
        await this.page.goto('https://automationexercise.com/');
    }
}