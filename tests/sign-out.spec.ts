// spec: specs/saucedemo-core-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { NavigationMenuPage } from './pages/NavigationMenuPage';
import { ProductsPage } from './pages/ProductsPage';

test.describe('Sign Out', () => {
  test('Log out and verify protected inventory redirects to login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const navigationMenuPage = new NavigationMenuPage(page);

    // 1. From a fresh app state, sign in with standard_user / secret_sauce.
    await loginPage.goto();
    await loginPage.signIn('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(productsPage.heading).toBeVisible();
    await expect(productsPage.productItems).toHaveCount(6);

    // 2. Open the navigation menu and select Logout.
    await navigationMenuPage.logOut();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();

    // 3. Navigate directly to https://www.saucedemo.com/inventory.html.
    await page.goto('https://www.saucedemo.com/inventory.html', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(productsPage.heading).toHaveCount(0);
  });
});
