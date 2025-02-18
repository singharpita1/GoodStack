// This file is organized according to my preference:
// 1. All element locators are defined in separate .ts files.
// 2. All functions are also defined within these .ts files to maintain a clean .spec.ts file.
// This organization makes the test files clean and easy to read, with locators centralized 
// in one place for easy maintenance and changes.

import { expect, test } from '@playwright/test'
import { GoodstackPage } from '../pages/base.page'
import { LandingPage } from '../pages/landingPage'

test.describe('execute', () => {
  let homePage: GoodstackPage;
  let landingPage: LandingPage;

  test.beforeEach(async ({ page }) => {
    homePage = new GoodstackPage(page)
    landingPage = new LandingPage(page)
    await homePage.visit();  // Visit the homepage before each test
  });

  test('test to goto homepage and navigate to donation and take screenshot', async ({page}) => {
    await landingPage.clickProductsButton();  // Click on Products button
    await landingPage.clickDonationsButton(); // Click on Donation button
    await page.waitForTimeout(1000); // Waiting for 1000ms

    // Check if we are on donation landing page
    expect(await landingPage.textOnDonationPage.isVisible()).toBeTruthy()

    // Take a screenshot
    const screenshot = 'screenshot'+ new Date().toLocaleString()+ '.png';
    await page.screenshot({ path: screenshot})
  });
})
