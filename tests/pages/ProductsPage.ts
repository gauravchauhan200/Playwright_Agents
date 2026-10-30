import { type Locator, type Page } from '@playwright/test';

export class ProductsPage {
  readonly heading: Locator;
  readonly sortDropdown: Locator;
  readonly productItems: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByText('Products', { exact: true });
    this.sortDropdown = page.getByRole('combobox', { name: 'Sort products' });
    this.productItems = page.locator('[data-test="inventory-item"]');
  }

  async sortByPriceAscending(): Promise<void> {
    await this.sortDropdown.selectOption('lohi');
  }

  getProductCard(productName: string): Locator {
    return this.productItems.filter({
      has: this.page.getByRole('button', { name: `View details for ${productName}` }),
    });
  }

  async openProductDetails(productName: string): Promise<void> {
    await this.getProductCard(productName).getByText(productName, { exact: true }).click();
  }
}
