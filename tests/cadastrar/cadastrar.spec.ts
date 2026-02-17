import { test, expect } from "@playwright/test";

test("Deve cadastrar um usuário com sucesso!", async ({ page }) => {
  await page.goto("http://localhost:3001/cadastrar");

  await expect(page).toHaveTitle(/Hotel DNC/i);
  await page.getByLabel(/digite o nome completo/i).fill("Kevin Kostner");
  await page.getByLabel(/e-mail/i).fill("kevinkostner@gmail.com");
  await page.getByLabel(/^senha/i).fill("12345678");
  await page.getByLabel(/confirmar senha/i).fill("12345678");
  await page.getByLabel(/^sim/i).click();
  await page.getByRole("button", { name: /cadastrar-se/i }).click();

  await expect(page).toHaveURL("http://localhost:3001/login");
});
