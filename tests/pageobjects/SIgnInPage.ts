import { Page } from "@playwright/test";
import { BasePage } from "./BaseBase";
import { BUTTON_TEXT, MESSAGES, TITLE_TEXT } from "../../utils/HelperAction";
import { TIME } from "../config/data/time";

export class SignInPage extends BasePage {
  readonly singInButton;
  readonly dropdownBtn;
  readonly loginBtn;
  readonly emailInput;
  readonly passwordInput;
  readonly submitBtn;

  constructor(page: Page, context: any) {
    super(page, context);
    this.singInButton = page.locator(`//span[text()="${BUTTON_TEXT.SIGN_IN}"]`);
    this.dropdownBtn = page.locator(`a[data-bs-toggle="dropdown"]`);
    this.loginBtn = page.locator(`//a[normalize-space()='Login']`);
    this.emailInput = page.locator(`#email`);
    this.passwordInput = page.locator(`#password`);
    this.submitBtn = page.locator(`button[type="submit"]`);
  }

  async checkComponentOnScreen(): Promise<void> {}
  async checkComponentOnForgetPasswordScreen(): Promise<void> {}
  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void> {
    await this.waitAndClick(this.dropdownBtn);
    await this.waitAndClick(this.loginBtn);
    await this.waitAndFill(this.emailInput, email);
    await this.waitAndFill(this.passwordInput, password);
    await this.waitAndClick(this.submitBtn);
  }
}
