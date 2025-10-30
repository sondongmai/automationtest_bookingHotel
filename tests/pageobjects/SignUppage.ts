import { Page } from "@playwright/test";
import { BasePage } from "./BaseBase";
import { BUTTON_TEXT, MESSAGES, TITLE_TEXT } from "../../utils/HelperAction";
import { TIME } from "../config/data/time";

export class SignUpPage extends BasePage {
  readonly titleSignUp;
  readonly titleFistName;
  readonly titleLastName;
  readonly titleEmail;
  readonly titlePassword;
  readonly registerButton;
  readonly firstNameInput;
  readonly lastNameInput;
  readonly emailInput;
  readonly passwordInput;
  readonly errorEmailInUse;
  constructor(page: Page, context: any) {
    super(page, context);
    this.titleSignUp = page.locator(
      "//h2[normalize-space()='Create Your Account']"
    );
    this.titleFistName = page.locator(
      `//label[normalize-space()='First Name']`
    );
    this.titleLastName = page.locator(`//label[normalize-space()='Last Name']`);
    this.titleEmail = page.locator(`//label[normalize-space()='Email']`);
    this.titlePassword = page.locator(`//label[normalize-space()='Password']`);
    this.registerButton = page.locator(`button[type="submit"]`);
    this.firstNameInput = page.locator(`#firstName`);
    this.lastNameInput = page.locator(`#lastName`);
    this.emailInput = page.locator(`#email`);
    this.passwordInput = page.locator(`#password`);
    this.errorEmailInUse = page.locator(`//div[@role='alert']`);
  }

  async checkComponentOnSignUpScreen(): Promise<void> {
    await this.waitUntilVisible(this.titleSignUp, TIME._2);
    await this.waitUntilVisible(this.titleFistName, TIME._2);
    await this.waitUntilVisible(this.titleLastName, TIME._2);
    await this.waitUntilVisible(this.titleEmail, TIME._2);
    await this.waitUntilVisible(this.titlePassword, TIME._2);
    await this.waitUntilVisible(this.firstNameInput, TIME._2);
    await this.waitUntilVisible(this.lastNameInput, TIME._2);
    await this.waitUntilVisible(this.emailInput, TIME._2);
    await this.waitUntilVisible(this.passwordInput, TIME._2);
    await this.waitUntilVisible(this.registerButton, TIME._2);
  }
  async register({
    firstName,
    lastName,
    email,
    password,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<void> {
    await this.waitAndFill(this.firstNameInput, firstName, TIME._2);
    await this.waitAndFill(this.lastNameInput, lastName, TIME._2);
    await this.waitAndFill(this.emailInput, email, TIME._2);
    await this.waitAndFill(this.passwordInput, password, TIME._2);
    await this.waitAndClick(this.registerButton, TIME._2);
  }
}
