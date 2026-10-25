import { test, expect } from "@playwright/test";

test("desktop: interests, project details, contacts and keyboard access", async ({
  page,
  context,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Un’idea.Il codice.Si parte.",
  );
  await page.getByRole("button", { name: "Web", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Web", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByRole("img", { name: "Web: Next.js, TypeScript, React, CSS" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "AI", exact: true }).click();
  await expect(
    page.getByRole("img", { name: "AI: Ollama, Gemma, Java, Computer vision" }),
  ).toBeVisible();
  const details = page.locator("article").first().locator("details");
  await details.locator("summary").click();
  await expect(details).toHaveAttribute("open", "");
  await expect(details.getByText(/Una shell modulare/)).toBeVisible();
  await page.getByRole("button", { name: "Copia indirizzo email" }).click();
  await expect(page.getByRole("status")).toHaveText("Indirizzo copiato");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "rccialrnzo605@gmail.com",
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Vai al contenuto" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.locator(".word").last()).toHaveCSS("transform", "none");
  await page.screenshot({ path: "/tmp/portfolio-desktop.png", fullPage: true });
  await page.screenshot({ path: "/tmp/portfolio-hero.png" });
  expect(errors).toEqual([]);
});

test("mobile: menu, escape and anchor navigation at narrow widths", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(page.getByRole("navigation")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Menu" })).toBeFocused();
  await expect(page.getByRole("navigation")).toBeHidden();
  await page.getByRole("button", { name: "Menu" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Progetti" })
    .click();
  await expect(page).toHaveURL(/#progetti$/);
  await expect(page.getByRole("navigation")).toBeHidden();
  await page
    .getByRole("button", { name: "Sistemi", exact: true })
    .scrollIntoViewIfNeeded();
  await page.locator("body").click({ position: { x: 5, y: 5 } });
  await page.screenshot({ path: "/tmp/portfolio-mobile.png", fullPage: true });
  for (const width of [320, 375, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `Overflow at ${width}px`,
    ).toBe(true);
  }
});

test("reduced motion bypasses smooth scrolling and leaves complete content", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  expect(
    await page.evaluate(() =>
      document.documentElement.classList.contains("lenis"),
    ),
  ).toBe(false);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByRole("button", { name: "Web", exact: true }).click();
  expect(
    await page
      .locator(".orbit-map")
      .evaluate((el) => getComputedStyle(el).transform),
  ).toBe("none");
});

test("without JavaScript all content, contact links and details remain usable", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 812 },
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("article")).toHaveCount(3);
  await page.locator("summary").first().click();
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
  await expect(
    page.locator('a[href="mailto:rccialrnzo605@gmail.com"]').first(),
  ).toBeVisible();
  await context.close();
});
