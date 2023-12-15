const user = require("../user.js");

const { test, expect, chromium } = require("@playwright/test");

test("valid test", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").fill(user.username);
  await page.getByPlaceholder("Пароль").fill(user.password);
  await page.getByTestId("login-submit-btn").click();
  await expect(page).toHaveTitle("Мои программы обучения", { timeout: 30000 });
});

test("not a valid test", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").fill(user.invalidUsername);
  await page.getByPlaceholder("Пароль").fill(user.invalidPassword);
  await page.getByTestId("login-submit-btn").click();
  await expect(page.getByTestId("login-error-hint")).toHaveText(
    "Вы ввели неправильно логин или пароль"
  );
});