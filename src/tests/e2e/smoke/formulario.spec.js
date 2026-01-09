// @ts-check
import { test, expect } from "@playwright/test";

test("@smoke Página inicial deve possuir título 'Calculadora IMC'", async ({
  page,
}) => {
  await page.goto("/index.html");
  await expect(page).toHaveTitle(/Calculadora IMC/);
});

test("@smoke Preenche e submete o formulário (nome, altura, peso)", async ({
  page,
}) => {
  await page.goto("/index.html");
  await page.evaluate(() => localStorage.removeItem("dados"));

  await page.fill('input[name="nome"]', "Test User");
  await page.fill('input[name="altura"]', "1,70");
  await page.fill('input[name="peso"]', "80");

  await page.click('button[type="submit"]');
});
