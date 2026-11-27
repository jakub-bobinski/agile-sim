import { expect, test } from "@playwright/test";

test("user can create a backlog item with the form", async ({ page }) => {
  const title = `E2E created ${Date.now()}`;

  await page.goto("/backlog");
  await page.waitForLoadState("networkidle");

  await page.getByRole("link", { name: "New item" }).click();
  await expect(
    page.getByRole("heading", { name: "New backlog item" }),
  ).toBeVisible();

  await page.getByLabel("Title").fill(title);
  await page.getByLabel("Description").fill("Created by an E2E test.");
  await page.getByLabel("Priority").selectOption("high");
  await page.getByRole("button", { name: "Create item" }).click();

  await expect(page).toHaveURL(/\/backlog\/\d+$/);
  await expect(page.getByRole("heading", { name: title })).toBeVisible();
});

test("form shows validation errors for empty fields", async ({ page }) => {
  await page.goto("/backlog/new");
  await page.waitForLoadState("networkidle");

  await page.getByRole("button", { name: "Create item" }).click();

  await expect(page.getByText("Title must be 3–80 characters.")).toBeVisible();
  await expect(
    page.getByText("Description is required (max 300 characters)."),
  ).toBeVisible();
  await expect(page.getByLabel("Title")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await expect(page).toHaveURL(/\/backlog\/new$/);
});

test("user can edit a backlog item", async ({ page, request }) => {
  const created = await request.post("/api/backlog", {
    data: {
      title: `E2E edit ${Date.now()}`,
      description: "Item to edit.",
      priority: "low",
    },
  });
  const { id } = await created.json();
  const newTitle = `E2E edited ${Date.now()}`;

  await page.goto(`/backlog/${id}`);
  await page.waitForLoadState("networkidle");

  await page.getByLabel("Title").fill(newTitle);
  await page.getByRole("button", { name: "Save changes" }).click();

  await expect(page.getByText("Saved.")).toBeVisible();
  await expect(page.getByRole("heading", { name: newTitle })).toBeVisible();
});

test("user can delete a backlog item", async ({ page, request }) => {
  const title = `E2E delete ${Date.now()}`;
  const created = await request.post("/api/backlog", {
    data: { title, description: "Item to delete.", priority: "medium" },
  });
  const { id } = await created.json();

  await page.goto(`/backlog/${id}`);
  await page.waitForLoadState("networkidle");

  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Delete item" }).click();

  await expect(page).toHaveURL(/\/backlog$/);
  await expect(page.getByText(title)).toHaveCount(0);
});

test("user can filter the backlog by priority", async ({ page, request }) => {
  const highTitle = `E2E high ${Date.now()}`;
  const lowTitle = `E2E low ${Date.now()}`;
  await request.post("/api/backlog", {
    data: { title: highTitle, description: "High item.", priority: "high" },
  });
  await request.post("/api/backlog", {
    data: { title: lowTitle, description: "Low item.", priority: "low" },
  });

  await page.goto("/backlog");
  await page.waitForLoadState("networkidle");

  await expect(page.getByText(lowTitle)).toBeVisible();

  await page.getByLabel("Priority").selectOption("high");

  await expect(page).toHaveURL(/\?priority=high$/);
  await expect(page.getByText(highTitle)).toBeVisible();
  await expect(page.getByText(lowTitle)).toHaveCount(0);
});

test("unknown backlog item shows an error page", async ({ page }) => {
  await page.goto("/backlog/999999");
  await page.waitForLoadState("networkidle");

  await expect(page.getByRole("alert")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Back to backlog" }),
  ).toBeVisible();
});
