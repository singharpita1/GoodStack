import { expect, test } from '@playwright/test'
import { BbcPage } from '../pages/bbcPage';
import { GoodstackPage } from '../../goodstack/pages/base.page'
import { waitForDebugger } from 'inspector';
// import { LandingPage } from '../pages/landingPage'

// This file is organized according to my preference:
// 1. All element locators are defined in separate .ts files.
// 2. All functions are also defined within these .ts files to maintain a clean .spec.ts file.
// This organization makes the test files clean and easy to read, with locators centralized 
// in one place for easy maintenance and changes.


test.describe('execute', () => {
  let bbcPage: BbcPage;

  test.beforeEach(async ({ page }) => {
    bbcPage = new BbcPage(page)
    console.log("bbcPage.url is:", bbcPage.url)
    await bbcPage.visit();  // Visit the homepage before each test
  });

  // Goto BBc and check its loading the site
  test('goto BBC and check its loading', async ({page}) => {
    expect(await bbcPage.bbcLogo.isVisible()).toBeTruthy() // check BBc logo is visbile
    expect(await bbcPage.welcomeToBbcMessage).toContainText("Welcome to the BBC") // check welcome to bbc message is displayed
  });

  // goto bbc homepage and check the headers
  test('goto BBC and check its headers', async ({page}) => {
    expect(await bbcPage.bbcLogo.isVisible()).toBeTruthy() // check BBc logo is visbile
    expect(await bbcPage.welcomeToBbcMessage).toContainText("Welcome to the BBC") // check welcome to bbc message is displayed
  });

  //go to BBc website and check if clicked on logo it is taking on correct page
  test('check if Bbc logo is clicked it goes to bbc.com', async ({page}) => {
    
    const bbcUrl = "https://www.bbc.co.uk/";
    const bbcNewsUrl = "https://www.bbc.co.uk/news";

    expect(await bbcPage.bbcLogo.isVisible()).toBeTruthy(); // check BBc logo is visbile
    expect(bbcPage.url).toContain(bbcUrl);
    await bbcPage.news.click();
    const currentUrl = page.url();
    expect(currentUrl).toContain(bbcNewsUrl);
    await bbcPage.bbcLogo.click();
    expect(page.url()).toContain(bbcUrl);
  });


  // check when clicked in sign in button it is taking on the login page
  test('click on sign in button and check login page is displayed', async ({page}) => {
   await bbcPage.clickSignInAndCheckLoginPageIsDisplayed() //this function will check login page is displayed
  })
})
