import { Locator, Page, expect } from '@playwright/test'
import exp from 'constants';

export class BbcPage {
    page: Page
    requestsSent: Request[] = []
    url: string

    public bbcLogo: Locator;
    public welcomeToBbcMessage: Locator;
    public bbcSignIn: Locator;
    public cookiePopUP: Locator;
    public acceptButtonOnCookiePopUP: Locator;
    public email: Locator;
    public notification: Locator;
    public home: Locator;
    public news: Locator;
    public sports: Locator;
    public weather: Locator;
    public iPlayer: Locator;
    public sounds: Locator;
    public bitSize: Locator;


    constructor(page: Page) {
        this.page = page
        this.url = 'https://www.bbc.co.uk/'
        this.bbcLogo = this.page.getByRole('link', { name: 'BBC Homepage' });
        this.welcomeToBbcMessage = this.page.getByText('Welcome to the BBC');
        this.bbcSignIn = this.page.getByRole('link', { name: 'Sign in' });
        this.cookiePopUP = this.page.getByRole('region', { name: 'Cookies on the BBC website' });
        this.email = this.page.getByTestId('input');
        this.notification = this.page.getByRole('link', { name: 'Notifications' });
        this.home = this.page.getByTestId('header-content').getByRole('link', { name: 'Home', exact: true });
        this.news = this.page.getByTestId('header-content').getByRole('link', { name: 'News' });
        this.sports = this.page.getByTestId('header-content').getByRole('link', { name: 'Sport' });
        this.weather = this.page.getByTestId('header-content').getByRole('link', { name: 'Weather' });
        this.iPlayer = this.page.getByTestId('header-content').getByRole('link', { name: 'iPlayer' });
        this.sounds = this.page.getByTestId('header-content').getByRole('link', { name: 'Sounds' });
        this.bitSize = this.page.getByTestId('header-content').getByRole('link', { name: 'Bitesize' });
    }

    public async visit(url?: string): Promise<any> {
        return this.page.goto(this.url, { waitUntil: 'networkidle' })
    }

    // Method to click the "Sign In" button and verify the Sign In page is displayed
    async clickSignInAndCheckLoginPageIsDisplayed() {
        await expect(this.bbcSignIn).toBeVisible();
        await this.bbcSignIn.click();

        // Handle cookies pop-up if present
        const acceptCookies = this.cookiePopUP.getByTestId('accept-button');
        if (await acceptCookies.isVisible()) {
        await acceptCookies.waitFor();
        await acceptCookies.click();
        }

        // Wait for login page elements to appear
        await expect(this.email).toBeVisible();
    }

     // Method to to check all the header items on BBC homepage
     async checkHeadersOnBbcHomepage() {
        const headerElements = [
            this.notification,
            this.home,
            this.news,
            this.sports,
            this.weather,
            this.iPlayer,
            this.sounds,
            this.bitSize
        ];
    
        for (const element of headerElements) {
            await expect(element).toBeVisible();
        }
    }
}