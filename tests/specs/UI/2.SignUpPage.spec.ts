import { test, expect } from "@playwright/test";
import { SignInPage } from "../../pageobjects/SIgnInPage";
import { SignUpPage } from "../../pageobjects/SignUppage";
import { DATA } from "../../config/data/signIn";
import { faker } from "@faker-js/faker";
import { MESSAGES } from "../../../utils/HelperAction";
test.describe("2. Sign Up page:", () => {
  let signInPage: SignInPage;
  let signUpPage: SignUpPage;
  test.beforeEach(async ({ page, context }) => {
    signInPage = new SignInPage(page, context);
    signUpPage = new SignUpPage(page, context);
    await signInPage.navigateToURL();
    await signInPage.waitAndClick(signInPage.dropdownBtn);
    await signInPage.waitAndDoubleClick(signInPage.loginBtn);
    await signInPage.waitAndClick(signInPage.registerBtn);
  });
  test.describe(" 2.1. UI", async () => {});
  test.only("[UI] TC001: Verify that all component is displayed on Sign Up Screen", async () => {
    await signUpPage.checkComponentOnSignUpScreen();
  });
  test.describe(`2.2. Register`, async () => {
    test.only("[func] TC002: Register to the platform successful", async () => {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const email = faker.internet.email();
      const password = faker.internet.password();
      await signUpPage.register({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
    });
  });
});
