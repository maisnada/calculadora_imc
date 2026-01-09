// @ts-check
import { test, expect } from "@playwright/test";

// NOTE: Run `npm run build` before running these tests so `docs/index.html` exists.
// You can also point to `dist/index.html` depending on your workflow.

test("Preenche e submete o formulário (nome, altura, peso)", async ({
  page,
}) => {
  await page.goto("/index.html");

  // limpar dados de teste
  await page.evaluate(() => localStorage.removeItem("dados"));

  // preencher campos com valores válidos (altura com vírgula para testar normalização)
  await page.fill('input[name="nome"]', "Test User");
  await page.fill('input[name="altura"]', "1,70");
  await page.fill('input[name="peso"]', "80");

  // submeter formulário
  await page.click('button[type="submit"]');

  // verificar se a primeira linha da tabela foi atualizada com os dados
  const firstRow = page.locator("table tbody tr").first();
  const tds = firstRow.locator("td");

  // td[1] -> nome (td[0] = data)
  await expect(tds.nth(1)).toHaveText("Test user");

  // td[5] -> classificação
  await expect(tds.nth(5)).toHaveText("Sobrepeso");
});

test("Edita um registro existente e atualiza a tabela", async ({ page }) => {
  await page.goto("/index.html");

  // limpar dados de teste
  await page.evaluate(() => localStorage.removeItem("dados"));

  // criar registro inicial
  await page.fill('input[name="nome"]', "Original User");
  await page.fill('input[name="altura"]', "1,70");
  await page.fill('input[name="peso"]', "80");
  await page.click('button[type="submit"]');

  const firstRow = page.locator("table tbody tr").first();

  // clicar em editar (segunda âncora)
  await firstRow.locator('a[href*="editar/"]').click();

  // verificar campos preenchidos
  await expect(page.locator('input[name="nome"]')).toHaveValue("Original user");
  await expect(page.locator('input[name="altura"]')).toHaveValue("1,7");
  await expect(page.locator('input[name="peso"]')).toHaveValue("80");

  // modificar valores e submeter
  await page.fill('input[name="nome"]', "Edited User");
  await page.fill('input[name="peso"]', "60");
  await page.click('button[type="submit"]');

  // verificar atualização na tabela
  const updatedRow = page.locator("table tbody tr").first();
  const updatedTds = updatedRow.locator("td");

  await expect(updatedTds.nth(1)).toHaveText("Edited user");
  await expect(updatedTds.nth(5)).toHaveText("Peso Normal");
});

test('Exclui um registro e mostra "Sem registros"', async ({ page }) => {
  await page.goto("/index.html");

  // limpar dados de teste
  await page.evaluate(() => localStorage.removeItem("dados"));

  // criar registro
  await page.fill('input[name="nome"]', "ToDelete");
  await page.fill('input[name="altura"]', "1,70");
  await page.fill('input[name="peso"]', "80");
  await page.click('button[type="submit"]');

  const firstRow = page.locator("table tbody tr").first();

  // clicar em excluir (primeira âncora)
  await firstRow.locator('a[href*="excluir/"]').click();

  // verificar que não há registros
  await expect(page.locator("table tbody td")).toHaveText("Sem registros");
});
