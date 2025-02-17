import { Page } from '@playwright/test';

export class LandingPage {
  private page: Page;
  private productsButton: any;
  private donationsButton: any;
  public textOnDonationPage: any;

 

  constructor(page: Page) {
    this.page = page;
    this.productsButton = this.page.getByRole('button', { name: 'Products Arrow down'})
    this.donationsButton = this.page.getByRole('menuitem', { name: 'Donations Send donations to'});
    this.textOnDonationPage = this.page.getByText('Send donations to causes');
  }
  // Method to click the "Products" button
  async clickProductsButton() {
    await this.productsButton.click();
  }

  // Method to click the "Donations" button
  async clickDonationsButton() {
    await this.donationsButton.click();
  }

}


