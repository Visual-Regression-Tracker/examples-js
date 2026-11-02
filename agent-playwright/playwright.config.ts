import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./src",
  globalSetup: "./global-setup.ts",
  globalTeardown: "./global-teardown.ts",
  use: { baseURL: "https://the-internet.herokuapp.com/" },
});
