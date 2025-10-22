import { defineConfig, devices } from "@playwright/test";
import "dotenv/config";

const config = defineConfig({
  testDir: "./tests",
  timeout: 50 * 1000,
  expect: {
    timeout: 6 * 1000,
  },
  forbidOnly: !!process.env.CI,
  retries: 3, // Give failing tests 3 retry attempts
  workers: 2,

  reporter: [
    ["list"],
    ["allure-playwright"],
    ["html", { outputFolder: "html-report", open: "on-end" }],
    [
      "ortoni-report",
      {
        base64Image: true,
        title: "Cinema Playwright Framework with Typescript",
        showProject: true,
        filename: "ortoni-report",
        authorName: "Son Nguyen",
        preferredTheme: "dark",
        folderPath: "ortoni-report",
        projectName: "Cinema Framework with Typescript",
      },
    ],
  ],

  use: {
    screenshot: "on",
    actionTimeout: 0,
    navigationTimeout: 60 * 1000,
    baseURL: "http://localhost:5173/",
    trace: "on-first-retry",
    headless: process.env.CI ? true : false,
    video: "retain-on-failure",
  },

  outputDir: "test-results/",

  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
      dependencies: ["setup"],
    },
    {
      name: "Google Chrome",
      use: {
        channel: "chrome",
        ...devices["Desktop Chrome"],
      },
      dependencies: ["setup"],
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
      dependencies: ["setup"],
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
      },
      dependencies: ["setup"],
    },
  ],
});

export default config;
