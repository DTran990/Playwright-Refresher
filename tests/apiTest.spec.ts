import { test, expect } from '../fixtures/page.fixture';

test('Test Case 1: GET All Products List (Happy Path)', async ( { request } ) => {

    const response = await request.get('https://automationexercise.com/api/productsList');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('products');
    expect(Array.isArray(responseBody.products)).toBe(true);
    expect(responseBody.products.length).toBeGreaterThan(0);
    expect(responseBody.products[0]).toHaveProperty('id');
    expect(responseBody.products[0]).toHaveProperty('name');
    expect(responseBody.products[0]).toHaveProperty('price'); 

});

test('Test Case 2: POST Search Product', async ( { request } ) => {

    const response = await request.post('https://automationexercise.com/api/searchProduct', {
        form: {
            search_product: 'Blue Top'}
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.products[0].name).toContain('Blue Top');
});

test('Test Case 3: Login with correct details', async ( { request } ) => {

    const response = await request.post('https://automationexercise.com/api/verifyLogin', {
        form: {
            email: 'testertest@test.com',
            password: 'Test1234?'
        }
}   );
    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(404);
    expect(responseBody.message).toBe('User exists!');

});

test('Test Case 4: Login with incorrect details', async ( { request } ) => {

    const response = await request.post('https://automationexercise.com/api/verifyLogin', {
        form: {
            email: 'testertest222fgjgh56@test.8768678678com',
            password: 'Test123222224?'
        }
}   );
    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(404);
    expect(responseBody.message).toBe('User not found!');

});