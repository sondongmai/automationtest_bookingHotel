import { test, expect } from "@playwright/test";
import { SignInPage } from "../../pageobjects/SIgnInPage";
import { DATA } from "../../config/data/signIn";
test.describe("1. Sign in:", () => {
  let signInPage: SignInPage;
  test.beforeEach(async ({ page, context }) => {
    signInPage = new SignInPage(page, context);
    await signInPage.navigateToURL();
  });
  test.describe(" 1.1. UI", async () => {
    test("[UI] TC001: Verify that all component is displayed on Screen", async () => {
      await signInPage.checkComponentOnForgetPasswordScreen();
    });
    test("[UI TC002: Verify that all component is displayed on Forget Password Screen", async () => {
      await signInPage.checkComponentOnForgetPasswordScreen();
    });
  });
  test.describe(`1.2. login/logout`, async () => {
    test.only("TC003: Login to the platform successful", async () => {
      await signInPage.login({
        email: DATA.credential1.email,
        password: DATA.credential1.password,
      });
    });
  });
});
