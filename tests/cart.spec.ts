import { test, expect } from '../fixtures/page.fixture';

test.beforeEach( async ({ productPage }) => {
    await productPage.goto();
});

