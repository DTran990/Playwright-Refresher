import { test, expect } from '../fixtures/page.fixture';

let productName: string;

test.beforeEach( async ({ LoginPage, productPage, cartPage, checkoutPage }) => {
    
    const UserCredentials = {
        email: 'testertest@test.com',
        password: 'Test1234?'
    }
    await LoginPage.goto();
    await LoginPage.fillLoginForm(UserCredentials.email, UserCredentials.password);
    await productPage.goto();
    const productItems = await productPage.productList.locator('.product-image-wrapper').all();
    const randomIndex = Math.floor(Math.random() * productItems.length);
    const selectedProduct = productItems[randomIndex];
    const productInformation = await selectedProduct.locator('.productinfo');
    productName = await productInformation.locator('p').textContent();
    await productInformation.locator('a').click();
    await cartPage.goto();
    await cartPage.checkoutButton.click();
    
});


test('Test Case 1: Verify that user can place order successfully', async ({ checkoutPage,orderConfirmationPage }) =>{

    const paymentDetails = {
        name: 'John Doe',
        cardNumber: '4111111111111111',
        cvc: '123',
        expiryMonth: '12',
        expiryYear: '2025'
    };
    await expect(checkoutPage.page).toHaveURL('https://automationexercise.com/checkout');
    const cartItems = await checkoutPage.cartItems.locator('tr');
    const itemName = await cartItems.locator('td.cart_description h4 a').textContent();
    expect (itemName).toContain(productName);
    await checkoutPage.placeOrderButton.click();
    await checkoutPage.fillPaymentForm(paymentDetails.name, paymentDetails.cardNumber, paymentDetails.cvc, paymentDetails.expiryMonth, paymentDetails.expiryYear);
    await expect(orderConfirmationPage.page).toHaveURL(/\/payment_done\//);
    await expect(orderConfirmationPage.orderPlacedMessage).toContainText('Order Placed!');

});