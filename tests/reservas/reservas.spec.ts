import { test, expect } from "@playwright/test";

const getFormattedDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
test("Deve conseguir fazer uma reserva com sucesso!", async ({ page }) => {
  await page.goto("http://localhost:3001/");

  await expect(page).toHaveURL("http://localhost:3001/login");
  await page.getByLabel(/e-mail/i).fill("fabio@teste.com");
  await page.getByLabel(/^senha/i).fill("12345");
  await page.getByRole("button", { name: /continuar/i }).click();
  await expect(page).toHaveURL("http://localhost:3001/");
  await page.getByText(/hotel luxo central/i).click();

  await expect(page).toHaveURL("http://localhost:3001/hotels/1");

  const today = new Date();
  const tomorrow = new Date(new Date().setDate(today.getDate() + 1));
  const nextWeek = new Date(new Date().setDate(today.getDate() + 7));

  const formattedTomorrow = getFormattedDate(tomorrow);
  const formattedNextWeek = getFormattedDate(nextWeek);
  await page
    .getByRole("textbox", { name: /data de check-in/i })
    .fill(formattedTomorrow);
  await page
    .getByRole("textbox", { name: /data de check-out/i })
    .fill(formattedNextWeek);

  await page.getByRole("button", { name: /reservar/i }).click();

  await expect(page).toHaveURL("http://localhost:3001/reservas/1/sucesso");
  await expect(
    page.getByText(
      /Sua solicitação de reserva na Hotel Praia Azul foi enviada!/i,
    ),
  ).toBeDefined();
});
