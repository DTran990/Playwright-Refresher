import { test, expect } from '../fixtures/page.fixture';

test.beforeEach( async ({ productPage }) => {
    await productPage.goto();
});

test('Test Case 1: Verify that user can add and remove products from cart ', async ({ page, productPage, cartPage }) =>{

    const productItems = await productPage.productList.locator('.product-image-wrapper').all();
    const randomIndex = Math.floor(Math.random() * productItems.length);
    const selectedProduct = productItems[randomIndex];
    const productInformation = await selectedProduct.locator('.productinfo');
    const productName = await productInformation.locator('p').textContent();
    await productInformation.locator('a').click();
    await expect(productPage.modalContent).toBeVisible();
    await expect(productPage.modalContent.locator('h4')).toContainText('Added!');
    await productPage.modalContent.locator('a').first().click();
    await expect(cartPage.page).toHaveURL(/\/view_cart/);
    await expect(cartPage.cartTable).toBeVisible();
    const cartItems = await cartPage.cartTable.locator('tbody tr').all();
    for (const item of cartItems) {
        const itemName = await item.locator('td.cart_description h4 a').textContent();
        expect (itemName).toContain(productName);
    } 
    await cartPage.cartTable.locator('tbody tr').first().locator('td.cart_delete a').click();
    await page.locator('#empty_cart').waitFor();
    await expect(page.locator('#empty_cart')).toContainText('Cart is empty!');

});


test('Test Case 2: Verify that user can add multiple products', async ({ page, productPage, cartPage }) =>{

    let productName: string[] = [];
    for (let i = 0; i < 3; i++) {
        let productItems = await productPage.productList.locator('.product-image-wrapper').all();
        let randomIndex = Math.floor(Math.random() * productItems.length);
        let selectedProduct = productItems[randomIndex];
        let productInformation = await selectedProduct.locator('.productinfo');
        let Name = await productInformation.locator('p').textContent();
        productName.push(Name);
        await productInformation.locator('a').click();
        await productPage.modalContent.locator('div.modal-footer button').click();
    }
    await cartPage.goto();
    await expect(cartPage.cartTable).toBeVisible();
    const cartItems = await cartPage.cartTable.locator('tbody tr').all();
    let count = 0;
    for (const item of cartItems) {
        const itemName = await item.locator('td.cart_description h4 a').textContent();
        expect (itemName).toContain(productName[count]);
        count++;
    } 

});