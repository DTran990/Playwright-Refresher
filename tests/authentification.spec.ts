import { test, expect } from '../fixtures/page.fixture';
import { createRandomUser } from '../utils/createRandomUser';

test.beforeEach( async ({ LoginPage }) => {
    await LoginPage.goto();
});

test('Test Case 1: Register User and Delete Account', async ({ LoginPage, signUpPage, accountCreatedPage, accountDeletedPage, homepage, page }) =>{

    await expect(LoginPage.signUpForm.locator('h2')).toBeVisible();
    await expect(LoginPage.signUpForm.locator('h2')).toHaveText('New User Signup!');
    const user = createRandomUser();
    await LoginPage.fillSignUpForm(user);
    await page.waitForURL('https://automationexercise.com/signup');
    await expect(signUpPage.registrationFormSection.locator('h2').first()).toBeVisible();
    await expect(signUpPage.registrationFormSection.locator('h2').first()).toHaveText('Enter Account Information');
    await signUpPage.fillRegistrationForm(user);
    await page.waitForURL('https://automationexercise.com/account_created');
    await expect(accountCreatedPage.page.getByTestId('account-created')).toBeVisible();
    await expect(accountCreatedPage.page.getByTestId('account-created')).toHaveText('Account Created!');
    await page.getByTestId('continue-button').click({ force: true });
    await expect(homepage.navbar.locator('li').filter({ hasText: `Logged in as ${user.username}` })).toBeVisible();
    await homepage.navbar.locator('li').filter({ hasText: 'Delete Account' }).click();
    await page.waitForURL('https://automationexercise.com/delete_account');
    await expect(accountDeletedPage.page.getByTestId('account-deleted')).toBeVisible();
    await expect(accountDeletedPage.page.getByTestId('account-deleted')).toHaveText('Account Deleted!');

})

test('Test Case 2: Login with Valid Credentials and Logout', async ({ LoginPage, homepage, page }) =>{

    const UserCredentials = {
        email: 'testertest@test.com',
        password: 'Test1234?'
    }
    await expect(LoginPage.loginForm.locator('h2')).toBeVisible();
    await expect(LoginPage.loginForm.locator('h2')).toHaveText('Login to your account');
    await LoginPage.fillLoginForm(UserCredentials.email, UserCredentials.password);
    await expect(homepage.navbar.locator('li').filter({ hasText: `Logged in as testertest` })).toBeVisible();
    await homepage.navbar.locator('li').filter({ hasText: 'Logout' }).click();
    await page.waitForURL('https://automationexercise.com/login');
    await expect(LoginPage.loginForm.locator('h2')).toHaveText('Login to your account');

});