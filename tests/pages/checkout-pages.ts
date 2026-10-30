import { type Locator, type Page } from '@playwright/test';
import { ProductsPage } from './ProductsPage';

export class InventoryPage extends ProductsPage {
  readonly cartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.cartLink = page.locator('#shopping_cart_container');
  }

  async addProductToCart(productName: string): Promise<void> {
    await this.getProductCard(productName).getByRole('button', { name: 'Add to cart' }).click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}

export class CartPage {
  readonly heading: Locator;
  readonly backpackItem: Locator;
  readonly backpackQuantity: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.heading = page.getByText('Your Cart', { exact: true });
    this.backpackItem = page.locator('.cart_item').filter({ hasText: 'Sauce Labs Backpack' });
    this.backpackQuantity = this.backpackItem.getByText('1', { exact: true });
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}

export class CheckoutInformationPage {
  readonly heading: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly validationAlert: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.heading = page.getByText('Checkout: Your Information', { exact: true });
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.postalCodeInput = page.getByRole('textbox', { name: 'Zip/Postal Code' });
    this.validationAlert = page.getByRole('alert');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
  }

  async continueWithoutCustomerInformation(): Promise<void> {
    await this.continueButton.click();
  }

  async fillCustomerInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToOverview(): Promise<void> {
    await this.continueButton.click();
  }
}

export class CheckoutOverviewPage {
  readonly heading: Locator;
  readonly backpackItem: Locator;
  readonly quantity: Locator;
  readonly paymentInformation: Locator;
  readonly shippingInformation: Locator;
  readonly itemTotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.heading = page.getByText('Checkout: Overview', { exact: true });
    this.backpackItem = page.locator('.cart_item').filter({ hasText: 'Sauce Labs Backpack' });
    this.quantity = this.backpackItem.getByText('1', { exact: true });
    this.paymentInformation = page.getByText('SauceCard #31337', { exact: true });
    this.shippingInformation = page.getByText('Free Pony Express Delivery!', { exact: true });
    this.itemTotal = page.getByText('Item total: $29.99', { exact: true });
    this.tax = page.getByText('Tax: $2.40', { exact: true });
    this.total = page.getByText('Total: $32.39', { exact: true });
    this.finishButton = page.getByRole('button', { name: 'Finish' });
  }

  async finishOrder(): Promise<void> {
    await this.finishButton.click();
  }
}

export class CheckoutCompletePage {
  readonly heading: Locator;
  readonly thankYouMessage: Locator;
  readonly cartIndicator: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.heading = page.getByText('Checkout: Complete!', { exact: true });
    this.thankYouMessage = page.getByRole('heading', { name: 'Thank you for your order!' });
    this.cartIndicator = page.getByRole('button', { name: 'Cart, empty' });
    this.backHomeButton = page.getByRole('button', { name: 'Back Home' });
  }
}
