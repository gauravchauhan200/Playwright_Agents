import { type Locator, type Page } from '@playwright/test';

export class NavigationMenuPage {
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.getByRole('button', { name: 'Logout' });
  }

  async logOut(): Promise<void> {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}
