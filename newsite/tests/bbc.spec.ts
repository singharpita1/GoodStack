// This file is organized according to my preference:
// 1. All element locators are defined in separate .ts files.
// 2. All functions are also defined within these .ts files to maintain a clean .spec.ts file.
// This organization makes the test files clean and easy to read, with locators centralized 
// in one place for easy maintenance and changes.

import { expect, test } from '@playwright/test'
import { BbcPage } from '../pages/bbcPage';
import { waitForDebugger } from 'inspector';

test.describe.configure({ mode: 'parallel' });
test.describe('execute', () => {
  let bbcPage: BbcPage;

  test.beforeEach(async ({ page }) => {
    bbcPage = new BbcPage(page)
    console.log("bbcPage.url is:", bbcPage.url)
    await bbcPage.visit();  // Visit the homepage before each test
  });

  // Go to BBC and check if site is loading
  test('goto BBC and check its loading', async ({page}) => {
    await expect(bbcPage.bbcLogo).toBeVisible(); // Check if BBC logo is visible
    await expect(bbcPage.welcomeToBbcMessage).toBeVisible(); // Check welcome message appears
    await expect(bbcPage.welcomeToBbcMessage).toContainText("Welcome to the BBC") // check welcome to bbc message is displayed
  });

  // Go to BBC homepage and check the headers
  test('goto BBC and check its headers', async ({page}) => {
    await expect(bbcPage.bbcLogo).toBeVisible(); // Check BBc logo is visbile
    await bbcPage.checkHeadersOnBbcHomepage() // Check headers is displayed
  });

  // Navigate to the BBC website and verify that clicking the logo redirects to the correct page
  test('check that clicking the BBC logo navigates to the correct page.', async ({page}) => {
    
    const bbcUrl = "https://www.bbc.co.uk/";
    const bbcNewsUrl = "https://www.bbc.co.uk/news";

    await expect(bbcPage.bbcLogo).toBeVisible(); // Check BBC logo is visbile
    expect(bbcPage.url).toContain(bbcUrl);
    await bbcPage.news.click();
    const currentUrl = page.url();
    expect(currentUrl).toContain(bbcNewsUrl);
    await bbcPage.bbcLogo.click();
    expect(page.url()).toContain(bbcUrl);
  });


  // Verify that clicking the Sign In button navigates to the login page.
  test('click on sign in button and check login page is displayed', async ({page}) => {
   await bbcPage.clickSignInAndCheckLoginPageIsDisplayed() // This function will check login page is displayed
  })
})
