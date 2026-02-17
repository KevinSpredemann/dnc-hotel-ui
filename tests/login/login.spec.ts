import { test, expect } from "@playwright/test";

test("Deve realizar a autenticação com sucesso!", async ({ page }) => {
  await page.goto("http://localhost:3001/");

  await expect(page).toHaveURL("http://localhost:3001/login");
  await page.getByLabel(/e-mail/i).fill("kevinkostner@gmail.com");
  await page.getByLabel(/^senha/i).fill("12345678");
  await page.getByRole("button", { name: /continuar/i }).click();
  await expect(page).toHaveURL("http://localhost:3001/");
});

test("Caso senha inválida usuário deve manter na página de login!", async ({
  page,
}) => {
  await page.goto("http://localhost:3001/");

  await expect(page).toHaveURL("http://localhost:3001/login");
  await page.getByLabel(/e-mail/i).fill("kevinkostner@gmail.com");
  await page.getByLabel(/^senha/i).fill("senhainvalida");
  await page.getByRole("button", { name: /continuar/i }).click();
  await expect(page).toHaveURL("http://localhost:3001/login");
});

test("Deve pedir para preencher campos obrigatórios!", async ({ page }) => {
  await page.goto("http://localhost:3001/");
  await expect(page).toHaveURL("http://localhost:3001/login");

  await page.getByLabel(/e-mail/i).fill("kevinkostner@gmail.com");
  await page.getByRole("button", { name: /continuar/i }).click();

  await expect(page).toHaveURL("http://localhost:3001/login");
  await expect(page.getByLabel(/senha/i)).toBeFocused();
});
