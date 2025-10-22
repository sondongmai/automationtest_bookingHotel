import { expect, Locator, Page } from "@playwright/test";
const DEFAULT_TIMEOUT = 60_000;
export class BasePage {
  readonly page: Page;
  readonly context: any;
  constructor(page: Page, context: any) {
    this.page = page;
    this.context = context;
  }

  private _getLocator(target: Locator | string): Locator {
    return typeof target === "string" ? this.page.locator(target) : target;
  }

  async navigateToURL(): Promise<void> {
    await this.page.goto("/", { waitUntil: "load" });
  }

  async waitForElementToBeStable(
    locator: Locator,
    timeout = DEFAULT_TIMEOUT
  ): Promise<void> {
    await expect(locator).toBeVisible({ timeout });
    await this.page.waitForTimeout(100);
  }

  async waitAndClick(
    target: Locator | string,
    timeout = DEFAULT_TIMEOUT
  ): Promise<void> {
    const locator = this._getLocator(target);
    await this.waitForElementToBeStable(locator, timeout);
    await locator.click();
  }

  async waitAndFill(
    target: Locator | string,
    value: string,
    timeout = DEFAULT_TIMEOUT
  ): Promise<void> {
    const locator = this._getLocator(target);
    await this.waitForElementToBeStable(locator, timeout);
    await locator.fill(value);
  }

  async waitAndSelectOption(
    target: Locator | string,
    optionValue: string,
    timeout = DEFAULT_TIMEOUT
  ) {
    const locator = this._getLocator(target);
    await this.waitForElementToBeStable(locator, timeout);
    await locator.selectOption(optionValue);
  }

  async waitAndExpectText(
    target: Locator | string,
    expectText: string,
    timeout = DEFAULT_TIMEOUT
  ): Promise<void> {
    const locator = this._getLocator(target);
    await this.waitForElementToBeStable(locator, timeout);

    const tagName = (await locator.evaluate((el) => el.tagName)).toLowerCase();
    const actualText =
      tagName === "input" || tagName === "textarea"
        ? await locator.inputValue()
        : await locator.textContent();

    await expect(actualText).toContain(expectText);
  }

  async waitAndDoubleClick(
    target: Locator | string,
    timeout = DEFAULT_TIMEOUT
  ): Promise<void> {
    const locator = this._getLocator(target);
    await this.waitForElementToBeStable(locator, timeout);
    await locator.dblclick();
  }

  async waitUntilOneVisible(
    targets: (string | Locator)[],
    timeout = DEFAULT_TIMEOUT
  ): Promise<Locator> {
    const start = Date.now();

    while (Date.now() - start < timeout) {
      for (const target of targets) {
        const locator = this._getLocator(target);
        if (await locator.isVisible().catch(() => false)) {
          return locator;
        }
      }
      await this.page.waitForTimeout(300);
    }
    throw new Error("None of the locators became visible within timeout");
  }
  async waitUntilVisible(
    target: string | Locator,
    timeout = DEFAULT_TIMEOUT
  ): Promise<void> {
    const locator = this._getLocator(target);
    await this.page.waitForTimeout(100);
    await this.waitForElementToBeStable(locator, timeout);
  }
  async waitUntilNotVisible(
    target: string | Locator,
    timeout = DEFAULT_TIMEOUT
  ): Promise<void> {
    const locator = this._getLocator(target);
    await expect(locator).not.toBeVisible({ timeout });
  }

  async waitAndCheck(
    target: string | Locator,
    timeout = DEFAULT_TIMEOUT
  ): Promise<void> {
    const locator = this._getLocator(target);
    await this.waitForElementToBeStable(locator, timeout);
    if (!(await locator.isChecked())) {
      await locator.isChecked();
    }
    await this.page.waitForTimeout(100);
  }

  async waitAndUnCheck(
    target: string | Locator,
    timeout = DEFAULT_TIMEOUT
  ): Promise<void> {
    const locator = this._getLocator(target);
    await this.waitForElementToBeStable(locator, timeout);
    if (await locator.isChecked()) {
      await locator.uncheck();
    }
  }

  async waitForPopupAndVerifyThenClose(
    trigger: Locator | string,
    popupSelector: string,
    timeout = 10000
  ) {
    const triggerLocator = this._getLocator(trigger);
    // Chờ popup mở ra sau khi click
    const [popupPage] = await Promise.all([
      this.page.context().waitForEvent("page", { timeout }),
      triggerLocator.click(),
    ]);

    // Kiểm tra element mong muốn trong popup
    const popupContent = popupPage.locator(popupSelector);
    await expect(popupContent).toBeVisible({ timeout });

    // Đóng popup
    await popupPage.close();

    // Đưa focus về lại page chính
    await this.page.bringToFront();
  }

  async waitforVisibleInFrame(
    ifFrameSelector: string,
    elementSelector: string,
    timeout = DEFAULT_TIMEOUT
  ): Promise<Locator> {
    const frame = await this.page.frameLocator(ifFrameSelector);
    const element = frame.locator(elementSelector);
    // await element.waitFor({ state: "visible", timeout });
    await expect(element).toBeVisible({ timeout });
    return element;
  }

  async checkUrlContainsText(url: string): Promise<void> {
    await this.page.waitForTimeout(2000);
    await expect(this.page).toHaveURL(new RegExp(url));
  }
}
