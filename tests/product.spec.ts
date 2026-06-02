import { test, expect } from '../fixtures/page.fixture';

test.beforeEach( async ({ productPage }) => {
    await productPage.goto();
});

test('Test Case 1: Verify that user can search for products and see the searched products', async ({ productPage }) =>{

    const productName = 'T-Shirt';
    await productPage.searchProduct(productName);
    const productItems = await productPage.productList.locator('.single-product').all();
    for (const item of productItems) {
        await expect(item.locator('p')).toContainText(productName);
    }

});

test('Test Case 2: Verify that user can select product categories', async ({ productPage }) =>{

    const categories = await productPage.categoryList.locator('.panel').all();
    for (const category of categories) {
        await category.locator('a').first().click();
        const categoryItems = await category.locator('li a').all();
        for (const item of categoryItems) {
            const itemName = await item.textContent();
            if (!itemName)
                continue;
            await item.click();
            const productItems = await productPage.productList.locator('.single-product').all();
            for (const item of productItems) {
                await expect(item.locator('p')).toContainText(itemName);
            }
            await category.locator('a').first().click();
        }
    }

});

test.only('Test Case 3: Verify that user can view product detail page', async ({ productPage, productDetailPage }) =>{

    const productItems = await productPage.productList.locator('.product-image-wrapper').all();
    const randomIndex = Math.floor(Math.random() * productItems.length);
    const selectedProduct = productItems[randomIndex];
    const productInformation = await selectedProduct.locator('.productinfo');
    const productName = await productInformation.locator('h2').textContent();
    const productDescription = await productInformation.locator('p').textContent();
    await selectedProduct.locator('div.choose a').click();
    await expect(productDetailPage.page).toHaveURL(/\/product_details\/\d+/);
    await expect(productDetailPage.productInformation).toBeVisible();
    await expect(productDetailPage.productInformation.locator('h2')).toContainText(productDescription || '');
    await expect(productDetailPage.productInformation.locator('span span')).toContainText(productName || '');

});