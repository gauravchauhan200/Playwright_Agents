// spec: specs/saucedemo-core-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import {
  CartPage,
  CheckoutCompletePage,
  CheckoutInformationPage,
  CheckoutOverviewPage,
  InventoryPage,
} from './pages/checkout-pages';

test.describe('Checkout and Order Completion', () => {
  test('Validate required checkout fields and complete an order', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // 1. From a fresh app state, sign in with standard_user / secret_sauce, add Sauce Labs Backpack to the cart, and open the cart.
    await loginPage.goto();
    await loginPage.signIn('standard_user', 'secret_sauce');
    await expect(inventoryPage.heading).toBeVisible();
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    await expect(cartPage.backpackItem).toHaveCount(1);
    await expect(cartPage.backpackQuantity).toHaveText('1');
    await expect(cartPage.checkoutButton).toBeVisible();

    // 2. Select Checkout and then Continue without entering customer information.
    await cartPage.proceedToCheckout();
    const checkoutInformationPage = new CheckoutInformationPage(page);
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    await expect(checkoutInformationPage.heading).toBeVisible();
    await checkoutInformationPage.continueWithoutCustomerInformation();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    await expect(checkoutInformationPage.validationAlert).toContainText('Error: First Name is required');
    await expect(checkoutInformationPage.heading).toBeVisible();

    // 3. Enter Taylor as First Name, Tester as Last Name, and 90210 as Zip/Postal Code, then select Continue.
    await checkoutInformationPage.fillCustomerInformation('Taylor', 'Tester', '90210');
    await checkoutInformationPage.continueToOverview();
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    await expect(checkoutOverviewPage.heading).toBeVisible();
    await expect(checkoutOverviewPage.backpackItem).toBeVisible();
    await expect(checkoutOverviewPage.quantity).toHaveText('1');
    await expect(checkoutOverviewPage.paymentInformation).toBeVisible();
    await expect(checkoutOverviewPage.shippingInformation).toBeVisible();
    await expect(checkoutOverviewPage.itemTotal).toHaveText('Item total: $29.99');
    await expect(checkoutOverviewPage.tax).toHaveText('Tax: $2.40');
    await expect(checkoutOverviewPage.total).toHaveText('Total: $32.39');

    // 4. Select Finish.
    await checkoutOverviewPage.finishOrder();
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    await expect(checkoutCompletePage.heading).toBeVisible();
    await expect(checkoutCompletePage.thankYouMessage).toBeVisible();
    await expect(checkoutCompletePage.cartIndicator).toBeVisible();
    await expect(checkoutCompletePage.backHomeButton).toBeVisible();
  });
});
