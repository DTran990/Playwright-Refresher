import { expect, type Locator, type Page } from "@playwright/test";

export class productPage {
    readonly page:Page;
    readonly searchBar: Locator;
    readonly searchButton: Locator;
    readonly productList: Locator;
    readonly leftSidebar: Locator;
    readonly categoryList: Locator;
    readonly modalContent: Locator;

    constructor( page: Page ) {
        this.page = page;
        this.searchBar = page.locator('#search_product');
        this.searchButton = page.locator('#submit_search');
        this.productList = page.locator('.features_items');
        this.leftSidebar = page.locator('.left-sidebar');
        this.categoryList = this.leftSidebar.locator('#accordian');
        this.modalContent =page.locator('.modal-content');
    }

    async goto(){
        await this.page.goto('https://automationexercise.com/products');
    }

    async searchProduct( productName: string ){
        await this.searchBar.fill(productName);
        await this.searchButton.click();
    }
}