import { Page, expect } from '@playwright/test'

export class GoodstackPage {
  page: Page
  requestsSent: Request[] = []

  url: string

  constructor(page: Page) {
    this.page = page
    //this.url = '/'
    this.url = 'https://goodstack.io/'
  }

  // INFO: LOCATORS
  menuElements = {
    root: () => this.page.locator('nav'),
    subMenuHeaderButton: (text: string) =>
      this.menuElements.root().locator('button').filter({ hasText: text }),
    headerLink: (text: string) =>
      this.menuElements.root().locator('li a').filter({ hasText: text }),
    getStartedButton: () => this.page
      .locator('button')
      .filter({ hasText: 'Get started' }),
    subMenuElement: (text: string) =>
      this.menuElements.root().locator('li a').filter({ hasText: text }),
  }

  footerElements = {
    root: () => this.page.locator('footer'),
    footerLink: (text: string) =>
      this.footerElements.root().locator('a').filter({ hasText: text }),
  }

  // INFO: ACTIONS
  public async visit(url?: string): Promise<any> {
    return this.page.goto(this.url, { waitUntil: 'networkidle' })
  }

  async clickMenuItem(menuItem: string) {
    const href = await this.menuElements
      .headerLink(menuItem)
      .getAttribute('href')
    await this.menuElements.headerLink(menuItem).click()

    return href
  }

  getFooterLinkHref(footerLink: string) {
    return this.footerElements.footerLink(footerLink).getAttribute('href')
  }

  async clickFooterLink(footerLink: string) {
    const href = await this.footerElements
      .footerLink(footerLink)
      .getAttribute('href')
    await this.footerElements.footerLink(footerLink).click()

    return href
  }

  async waitForRedirectToUrl(url: string) {
    let currentUrl = this.page.url()
    let retries = 5

    while (retries-- > 0 && !currentUrl.includes(url)) {
      await this.page.waitForTimeout(2000)
      currentUrl = this.page.url()
    }

    expect(currentUrl).toContain(url)
    await this.page.waitForTimeout(2000) // Ensure no redirects are happening
    expect(currentUrl).toContain(url)
  }

  // async clickSubMenuElement(parent: string, subMenuElement: string) {
  //   await this.menuElements.subMenuHeaderButton(parent).click()
  //   const href = await this.menuElements
  //     .subMenuElement(subMenuElement)
  //     .getAttribute('href')
  //   await this.menuElements.subMenuElement(subMenuElement).click()

  //   return href
  // }
}
