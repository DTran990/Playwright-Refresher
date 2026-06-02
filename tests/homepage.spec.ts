import { test, expect } from '../fixtures/page.fixture';

test.beforeEach( async ({ homepage }) => {
    await homepage.goto();
});

test('Test Case 1: Verify Home Page is loaded successfully ', async ({ homepage }) =>{

    await expect(homepage.navbar).toBeVisible();
    await expect(homepage.homepageSlider).toBeVisible();   

});

test('Test Case 2: Verify navbar links are working', async ({ homepage }) => {

    const navLinks = await homepage.navbar.locator('li a').all();
    for (const link of navLinks) {

        const href = await link.getAttribute('href');
        await homepage.navbar.locator(`li a[href="${href}"]`).click();
        await expect(homepage.page).toHaveURL(`https://automationexercise.com${href}`);
        await homepage.goto();

    }
});