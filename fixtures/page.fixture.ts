import { test as base } from '@playwright/test';
import { LoginPage } from '../page-objects/pages/login.page';
import { signUpPage } from '../page-objects/pages/signUp.page';
import { accountCreatedPage } from '../page-objects/pages/accountCreated.page';
import { homepage } from '../page-objects/pages/homepage.page';
import { accountDeletedPage } from 'page-objects/pages/accountDeleted.page';
import { productPage } from 'page-objects/pages/product.page';
import { productDetailPage } from 'page-objects/pages/productDetail.page';
import { cartPage } from 'page-objects/pages/cart.page';
import { checkoutPage } from 'page-objects/pages/checkout.page';
import { orderConfirmationPage } from 'page-objects/pages/orderConfirmation.page';

type Fixtures = {
    LoginPage: LoginPage,
    signUpPage: signUpPage,
    accountCreatedPage: accountCreatedPage,
    homepage: homepage,
    accountDeletedPage: accountDeletedPage,
    productPage: productPage,
    productDetailPage: productDetailPage,
    cartPage: cartPage,
    checkoutPage: checkoutPage,
    orderConfirmationPage: orderConfirmationPage
};

export const test = base.extend<Fixtures> ({
    LoginPage: async({ page }, use) => {
        await use(new LoginPage(page));
    },
    signUpPage: async({ page }, use) => {
        await use(new signUpPage(page));
    },
    accountCreatedPage: async({ page }, use) => {
        await use(new accountCreatedPage(page));
    },
    homepage: async({ page }, use) => {
        await use(new homepage(page));
    },
    accountDeletedPage: async({ page }, use) => {
        await use(new accountDeletedPage(page));
    },
    productPage: async({ page }, use) => {
        await use(new productPage(page));
    },
    productDetailPage: async({ page }, use) => {
        await use(new productDetailPage(page));
    },
    cartPage: async({ page }, use) => {
        await use(new cartPage(page));
    },
    checkoutPage: async({ page }, use) => {
        await use(new checkoutPage(page));
    },
    orderConfirmationPage: async({ page }, use) => {
        await use(new orderConfirmationPage(page));
    }
});

export { expect } from '@playwright/test';