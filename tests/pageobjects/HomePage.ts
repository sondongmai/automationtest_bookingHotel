import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BaseBase";
import { TIME } from "../config/data/time";
const DEFAULT_TIMEOUT = 60_000;
export class HomePage extends BasePage {
  readonly titleHome;
  readonly titleCheckInDate;
  readonly titleCheckOutDate;
  readonly titleRoomType;
  readonly searchBtn;
  readonly findBookingBtn;
  readonly browseAllRoomsBtn;
  readonly titleFilterByRoomType;
  readonly clearFilterBtn;
  readonly roomImage;
  readonly dropdownBtn;
  readonly changePasswordBtn;
  readonly tittleChangePassword;
  readonly titleOldPassword;
  readonly titleNewPassword;
  readonly titleConfirmNewPassword;
  readonly oldPasswordInput;
  readonly newPasswordInput;
  readonly confirmNewPasswordInput;
  readonly submitChangePasswordBtn;

  constructor(page: Page, context: any) {
    super(page, context);
    this.titleHome = page.locator(
      `(//span[@class='hotel-color'][normalize-space()='lakeSide Hotel'])[2]`
    );
    this.titleCheckInDate = page.locator(`label[for="checkInDate"]`);
    this.titleCheckOutDate = page.locator(`label[for="checkOutDate"]`);
    this.titleRoomType = page.locator(`label[for="roomType"]`);
    this.searchBtn = page.locator(`//button[normalize-space()='Search']`);
    this.findBookingBtn = page.locator(
      `//a[normalize-space()='Find my booking']`
    );
    this.browseAllRoomsBtn = page.locator(
      `(//a[@class='btn btn-outline-dark d-block mb-3'][normalize-space()='Browse all rooms'])[1]`
    );
    this.titleFilterByRoomType = page.locator(`#room-type-filter`);
    this.clearFilterBtn = page.locator(
      `//button[normalize-space()='Clear Filter']`
    );
    this.roomImage = page.locator(`img[alt="Room Photo"]`);
    this.dropdownBtn = page.locator(`a[data-bs-toggle="dropdown"]`);
    this.changePasswordBtn = page.locator(
      `//a[normalize-space()='Change Password']`
    );
    this.tittleChangePassword = page.locator(
      `//h2[normalize-space()='Change Password']`
    );
    this.titleOldPassword = page.locator(`label[for="password"]`);
    this.titleNewPassword = page.locator(`label[for="newPassword"]`);
    this.titleConfirmNewPassword = page.locator(
      `label[for="confirmNewPassword"]`
    );
    this.oldPasswordInput = page.locator(`#password`);
    this.newPasswordInput = page.locator(`#newPassword`);
    this.confirmNewPasswordInput = page.locator(`#confirmNewPassword`);
    this.submitChangePasswordBtn = page.locator(`button[type="submit"]`);
  }

  async checkComponentOnHomeScreen(): Promise<void> {
    await this.waitUntilVisible(this.titleHome, TIME._2);
    await this.waitUntilVisible(this.titleCheckInDate, TIME._2);
    await this.waitUntilVisible(this.titleCheckOutDate, TIME._2);
    await this.waitUntilVisible(this.titleRoomType, TIME._2);
    await this.waitUntilVisible(this.searchBtn, TIME._2);
    await this.waitUntilVisible(this.findBookingBtn, TIME._2);
  }
  async seeAllRooms(): Promise<void> {
    await this.waitAndClick(this.browseAllRoomsBtn, TIME._2);
    await this.waitUntilVisible(this.roomImage.first(), TIME._2);
    await this.waitUntilVisible(this.titleFilterByRoomType, TIME._2);
    await this.waitUntilVisible(this.clearFilterBtn, TIME._2);
  }
  async CheckAllComponentOnchangePasswordScreen(): Promise<void> {
    await this.waitAndDoubleClick(this.dropdownBtn, TIME._2);
    await this.waitAndDoubleClick(this.changePasswordBtn, TIME._2);
    await this.waitUntilVisible(this.tittleChangePassword, TIME._3);
    await this.waitUntilVisible(this.titleOldPassword, TIME._2);
    await this.waitUntilVisible(this.titleNewPassword, TIME._2);
    await this.waitUntilVisible(this.titleConfirmNewPassword, TIME._2);
    await this.waitUntilVisible(this.oldPasswordInput, TIME._2);
    await this.waitUntilVisible(this.newPasswordInput, TIME._2);
    await this.waitUntilVisible(this.confirmNewPasswordInput, TIME._2);
    await this.waitUntilVisible(this.submitChangePasswordBtn, TIME._2);
  }
  async changePassword({
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
  }): Promise<void> {
    await this.waitAndDoubleClick(this.dropdownBtn, TIME._2);
    await this.waitAndDoubleClick(this.changePasswordBtn, TIME._2);
    await this.waitAndFill(this.oldPasswordInput, oldPassword, TIME._2);
    await this.waitAndFill(this.newPasswordInput, newPassword, TIME._2);
    await this.waitAndFill(this.confirmNewPasswordInput, newPassword, TIME._2);
    await this.waitAndClick(this.submitChangePasswordBtn, TIME._2);
  }
}
