import { type Locator, type Page } from '@playwright/test';

export class ProductDetailsPage {
  readonly productName: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly backToProductsButton: Locator;

  constructor(private readonly page: Page) {
    const details = page.locator('.inventory_details');
    this.productName = details.getByText('Sauce Labs Backpack', { exact: true });
    this.productDescription = details.getByText(
      'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
      { exact: true },
    );
    this.productPrice = details.getByText('$29.99', { exact: true });
    this.addToCartButton = details.getByRole('button', { name: 'Add to cart' });
    this.backToProductsButton = page.getByRole('button', { name: 'Back to products' });
  }

  async backToProducts(): Promise<void> {
    await this.backToProductsButton.click();
  }
}
