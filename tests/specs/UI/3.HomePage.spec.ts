import { test, expect } from "@playwright/test";
import { SignInPage } from "../../pageobjects/SIgnInPage";
import { SignUpPage } from "../../pageobjects/SignUppage";
import { DATA } from "../../config/data/signIn";
import { faker } from "@faker-js/faker";
import { MESSAGES } from "../../../utils/HelperAction";
import { HomePage } from "../../pageobjects/HomePage";
test.describe("3. Home page:", () => {
  let signInPage: SignInPage;
  let signUpPage: SignUpPage;
  let homePage: HomePage;
  test.beforeEach(async ({ page, context }) => {
    signInPage = new SignInPage(page, context);
    signUpPage = new SignUpPage(page, context);
    homePage = new HomePage(page, context);
    await homePage.navigateToURL();
    await signInPage.login({
      email: DATA.credential1.email,
      password: DATA.credential1.password,
    });
  });
  test.describe(" 3.1. UI", async () => {
    test.only("[UI] TC001: Verify that all component is displayed on Home Page", async () => {
      await homePage.checkComponentOnHomeScreen();
    });
    test.only("[UI] TC002: Verify that all component is displayed on Change Password Screen", async () => {
      await homePage.CheckAllComponentOnchangePasswordScreen();
    });
  });

  test.describe(`3.2. Func`, async () => {
    test.only("[func] TC002: Verify that user can see all rooms when click on Browse all rooms button", async () => {
      await homePage.seeAllRooms();
    });
    test.only("[func] TC003: Verify that user can change password successfully", async () => {});
  });
});
