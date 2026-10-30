// spec: specs/saucedemo-core-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { ProductsPage } from './pages/ProductsPage';

test.describe('Product Discovery', () => {
  test('Browse products, sort by ascending price, and inspect a product', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    // 1. From a fresh app state, sign in with standard_user / secret_sauce.
    await loginPage.goto();
    await loginPage.signIn('standard_user', 'secret_sauce');

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(productsPage.heading).toBeVisible();
    await expect(productsPage.productItems).toHaveCount(6);
    await expect(productsPage.sortDropdown).toHaveValue('az');

    // 2. Change Sort products to Price (low to high).
    await productsPage.sortByPriceAscending();

    await expect(productsPage.sortDropdown).toHaveValue('lohi');
    await expect(productsPage.getProductCard('Sauce Labs Onesie').getByText('Sauce Labs Onesie', { exact: true })).toBeVisible();
    await expect(productsPage.getProductCard('Sauce Labs Onesie').getByText('$7.99', { exact: true })).toBeVisible();
    await expect(productsPage.getProductCard('Sauce Labs Bike Light').getByText('Sauce Labs Bike Light', { exact: true })).toBeVisible();
    await expect(productsPage.getProductCard('Sauce Labs Bike Light').getByText('$9.99', { exact: true })).toBeVisible();
    await expect(productsPage.productItems.nth(0).getByText('Sauce Labs Onesie', { exact: true })).toBeVisible();
    await expect(productsPage.productItems.nth(1).getByText('Sauce Labs Bike Light', { exact: true })).toBeVisible();

    // 3. Open the Sauce Labs Backpack product details.
    await productsPage.openProductDetails('Sauce Labs Backpack');
    const productDetailsPage = new ProductDetailsPage(page);
    await expect(page).toHaveURL(/inventory-item\.html\?id=4/);
    await expect(productDetailsPage.productName).toBeVisible();
    await expect(productDetailsPage.productDescription).toContainText(
      'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
    );
    await expect(productDetailsPage.productPrice).toHaveText('$29.99');
    await expect(productDetailsPage.addToCartButton).toBeVisible();
    await expect(productDetailsPage.backToProductsButton).toBeVisible();

    // 4. Select Back to products.
    await productDetailsPage.backToProducts();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(productsPage.heading).toBeVisible();
    await expect(productsPage.sortDropdown).toHaveValue('lohi');
  });
});
