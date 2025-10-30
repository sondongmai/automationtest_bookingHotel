import { test, expect } from "@playwright/test";
import { SignInPage } from "../../pageobjects/SIgnInPage";
import { DATA } from "../../config/data/signIn";
import { faker } from "@faker-js/faker";
import { MESSAGES } from "../../../utils/HelperAction";
test.describe("1. Sign in:", () => {
  let signInPage: SignInPage;
  test.beforeEach(async ({ page, context }) => {
    signInPage = new SignInPage(page, context);
    await signInPage.navigateToURL();
  });
  test.describe(" 1.1. UI", async () => {
    test("[UI] TC001: Verify that all component is displayed on Screen", async () => {
      await signInPage.checkComponentOnSignInScreen();
    });
    test("[UI TC002: Verify that all component is displayed on Sign Up  Screen", async () => {
      await signInPage.checkComponentOnForgetPasswordScreen();
    });
  });

  test.describe(`1.2. login/logout`, async () => {
    test("[func] TC003: Login to the platform successful", async () => {
      await signInPage.login({
        email: DATA.credential1.email,
        password: DATA.credential1.password,
      });
    });
    test("[func] TC004: Logout from the platform successful", async () => {
      await signInPage.login({
        email: DATA.credential1.email,
        password: DATA.credential1.password,
      });
      await signInPage.logout();
    });
    test("[func] TC005: Login fail with invalid password", async () => {
      await signInPage.login({
        email: DATA.credential1.email,
        password: faker.internet.password(),
      });
      await signInPage.waitAndExpectText(
        signInPage.loginErrorMessage,
        MESSAGES.SIGNIN_ERROR
      );
    });
    test("[func] TC006: Login fail with invalid email", async () => {
      await signInPage.login({
        email: faker.internet.email(),
        password: DATA.credential1.password,
      });
      await signInPage.waitAndExpectText(
        signInPage.loginErrorMessage,
        MESSAGES.SIGNIN_ERROR
      );
    });
  });
});
