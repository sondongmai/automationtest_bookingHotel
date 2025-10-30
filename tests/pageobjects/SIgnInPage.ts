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
  readonly logoutBtn;
  readonly loginTitle;
  readonly registerBtn;
  readonly emailTitle;
  readonly passwordTitle;
  readonly loginErrorMessage;

  constructor(page: Page, context: any) {
    super(page, context);
    this.singInButton = page.locator(`//span[text()="${BUTTON_TEXT.SIGN_IN}"]`);
    this.dropdownBtn = page.locator(`a[data-bs-toggle="dropdown"]`);
    this.loginBtn = page.locator(
      `//a[normalize-space()='${BUTTON_TEXT.SIGN_IN}']`
    );
    this.emailInput = page.locator(`#email`);
    this.passwordInput = page.locator(`#password`);
    this.submitBtn = page.locator(`button[type="submit"]`);
    this.logoutBtn = page.locator(`(//button[normalize-space()='Logout'])`);
    this.loginTitle = page.locator(
      `//h2[normalize-space()='${BUTTON_TEXT.SIGN_IN}']`
    );
    this.registerBtn = page.locator(`//a[normalize-space()='Register']`);
    this.emailTitle = page.locator(`//label[normalize-space()='Email']`);
    this.passwordTitle = page.locator(`//label[normalize-space()='Password']`);
    this.loginErrorMessage = page.locator(`(//p[@class='alert alert-danger'])`);
  }

  async checkComponentOnSignInScreen(): Promise<void> {
    await this.waitAndClick(this.dropdownBtn);
    await this.waitAndClick(this.loginBtn);
    await this.waitUntilVisible(this.loginTitle, TIME._2);
    await this.waitUntilVisible(this.emailInput, TIME._2);
    await this.waitUntilVisible(this.passwordInput, TIME._2);
    await this.waitUntilVisible(this.submitBtn, TIME._2);
    await this.waitUntilVisible(this.registerBtn, TIME._5);
    await this.waitUntilVisible(this.emailTitle, TIME._2);
    await this.waitUntilVisible(this.passwordTitle, TIME._2);
  }
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
  async logout(): Promise<void> {
    await this.waitAndDoubleClick(this.dropdownBtn);
    await this.waitAndClick(this.logoutBtn);
    await this.waitAndDoubleClick(this.dropdownBtn);
    await this.waitUntilVisible(this.loginBtn, TIME._1);
  }
}
