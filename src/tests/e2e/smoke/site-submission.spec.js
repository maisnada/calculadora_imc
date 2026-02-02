// @ts-check
import { test, expect } from "@playwright/test";

test("@smoke Acessa site, preenche formul�rio e submete", async ({ page }) => {
  // 1. NAVEGA��O - Acessar o site
  await page.goto("https://maisnada.github.io/calculadora_imc/");

  // Verificar que a p�gina carregou
  await expect(page).toHaveTitle("Calculadora IMC");
  const heading = page.locator("h1");
  await expect(heading).toContainText("Calculadora IMC");

  // 2. PREENCHIMENTO DO FORMUL�RIO
  // Preencher campo "Nome"
  await page.fill('input[name="nome"]', "João silva");
  await expect(page.locator('input[name="nome"]')).toHaveValue("João silva");

  // Preencher campo "Altura (M)"
  await page.fill('input[name="altura"]', "1,75");
  await expect(page.locator('input[name="altura"]')).toHaveValue("1,75");

  // Preencher campo "Peso (Kg)"
  await page.fill('input[name="peso"]', "75");
  await expect(page.locator('input[name="peso"]')).toHaveValue("75");

  // 3. SUBMISS�O DO FORMUL�RIO
  const submitButton = page.locator('button[type="submit"]');
  await submitButton.click();

  // 4. VALIDA��O DO RESULTADO
  // Aguardar a tabela ser atualizada com o novo registro
  const tbody = page.locator("table tbody");
  const firstRow = tbody.locator("tr").first();

  // Verificar que o registro foi adicionado � tabela
  await expect(firstRow).toBeVisible();

  // Validar os dados do registro
  const cells = firstRow.locator("td, th");

  // Verificar ID (primeiro elemento � th)
  await expect(cells.nth(0)).toContainText("1");

  // Verificar Nome (segundo elemento ap�s data)
  await expect(cells.nth(2)).toContainText("João silva"); // normalizado

  // Verificar Altura
  await expect(cells.nth(3)).toContainText("1.75");

  // Verificar Peso
  await expect(cells.nth(4)).toContainText("75");

  // Verificar IMC (24.5)
  await expect(cells.nth(5)).toContainText("24.5");

  // Verificar Classifica��o
  await expect(cells.nth(6)).toContainText("Peso Normal");

  // 5. VERIFICAR A��ES DISPON�VEIS
  const actions = firstRow.locator("a");
  const deleteLink = actions.nth(0); // primeira a��o: excluir
  const editLink = actions.nth(1); // segunda a��o: editar

  // Verificar que os links de a��o existem
  await expect(deleteLink).toBeVisible();
  await expect(editLink).toBeVisible();

  // Verificar URLs dos links
  await expect(deleteLink).toHaveAttribute("href", /excluir\/1/);
  await expect(editLink).toHaveAttribute("href", /editar\/1/);
});
