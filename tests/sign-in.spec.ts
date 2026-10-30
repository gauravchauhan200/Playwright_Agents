// spec: specs/saucedemo-core-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Sign In', () => {
  test('Sign in with valid credentials and reject invalid credentials', async ({ page }) => {
    // 1. Starting from a fresh login page, enter an invalid username and password and select Login.
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('invalid_user');
    await page.locator('[data-test="password"]').fill('invalid_password');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByRole('alert')).toContainText('Username and password do not match');
    await expect(page.getByRole('heading', { name: 'Products' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: /^Cart/ })).toHaveCount(0);

    // 2. Replace the credentials with username standard_user and password secret_sauce, then select Login.
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.getByText('Products', { exact: true })).toBeVisible();
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
    await expect(page.getByRole('button', { name: 'Cart, empty' })).toBeVisible();
  });
});
